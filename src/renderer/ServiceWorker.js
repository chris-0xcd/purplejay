import './ServiceWorkerHack'
import HttpModule from './HttpModule'

import * as Base64 from '@borderless/base64'
import { APIMethods, Models, Protocol } from '@polycentric/polycentric-core'

addEventListener('install', (event) => {
  console.log('Service worker install')
  event.waitUntil(self.skipWaiting())
})

addEventListener('activate', (event) => {
  console.log('Service worker activate')
  event.waitUntil(self.clients.claim())
})

let main
const pluginWorkers = new Map()

async function callMain(data) {
  return call(main, data)
}

async function call(worker, data) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()
    channel.port1.onmessage = (event) => {
      if (event.data.error) {
        reject(event.data)
      } else {
        resolve(event.data)
      }
    }
    worker.postMessage({ data }, [channel.port2])
  })
}

/* const httpModule = new HttpModule() */

async function handleFetch(e) {
  //console.log('fetch')
  const result = await callMain({
    request: 'module',
    module: 'HttpModule',
    data: await e.request.json()
  })
  /* const result = await httpModule.handleRequest(await e.request.json()) */
  return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } })
}

function capitalizeHeader(value) {
  return value
    .split('-')
    .map((str) => str[0].toUpperCase() + str.slice(1))
    .join('-')
}

async function handleMediaUrl(u, e) {
  const workerId = u.searchParams.get('workerId')
  const videoId = u.searchParams.get('videoId')
  const sourceIdx = u.searchParams.get('sourceIdx')
  const sourceType = u.searchParams.get('sourceType')

  let headers = {}
  for (const header of e.request.headers) {
    if (header[0].startsWith('sec-')) {
      continue
    }
    headers[capitalizeHeader(header[0])] = header[1]
  }

  let modifiedRequest = await call(pluginWorkers.get(workerId), {
    command: 'modifyVideoRequest',
    data: {
      videoId,
      sourceIdx,
      sourceType,
      headers: headers
    }
  })

  return fetch(modifiedRequest.url, {
    method: e.request.method,
    headers: modifiedRequest.headers,
    cache: modifiedRequest.cache,
    body: e.request.body
  })
}

async function handlePolycentric(u) {
  const data = Base64.decode(u.pathname.substring('/@polycentric@/'.length))

  const datalink = Protocol.URLInfoDataLink.decode(data)

  const eventRes = await APIMethods.getEvents(
    'https://srv1-stg.polycentric.io',
    Models.PublicKey.fromProto(datalink.system), // ?
    {
      rangesForProcesses: [
        {
          process: datalink.process,
          ranges: datalink.sections
        }
      ]
    }
  )

  console.log(eventRes)

  const signedEvents = eventRes.events.map((e) =>
    Models.Event.fromBuffer(Models.SignedEvent.fromProto(e).event)
  )

  let mergedArray = new Uint8Array(datalink.byteCount.toNumber())

  let offset = 0
  for (const section of datalink.sections) {
    const sectionEvents = signedEvents
      .filter(
        (event) =>
          event.logicalClock.greaterThanOrEqual(section.low) &&
          event.logicalClock.lessThanOrEqual(section.high)
      )
      .sort((a, b) => a.logicalClock - b.logicalClock)

    // todo: validate range
    for (const sectionEvent of sectionEvents) {
      sectionEvent.content

      mergedArray.set(sectionEvent.content, offset)
      offset += sectionEvent.content.length
    }
  }

  return new Response(mergedArray, {
    status: 200,
    headers: {
      'Content-Type': datalink.mime,
      'Cache-Control': 'max-age=3600'
    }
  })
}

addEventListener('fetch', (e) => {
  const u = new URL(e.request.url)
  if (u.pathname === '/@HttpModule@/') {
    e.respondWith(handleFetch(e))
  } else if (u.pathname === '/@MediaUrl@/') {
    // searchParams
    e.respondWith(handleMediaUrl(u, e))
  } else if (u.pathname.startsWith('/@polycentric@/')) {
    e.respondWith(handlePolycentric(u, e))
  } else {
    //console.log(e)
  }
  // test 7
})

addEventListener('message', async (e) => {
  if (e.data.message === 'registerMain') {
    main = e.ports[0]
    main.postMessage({ message: 'installed' })
  } else if (e.data.message === 'registerPlugin') {
    pluginWorkers.set(e.data.id, e.ports[0])
  }
})
