const videoPagers = ['subcomments']

class PagerWrapper {
  pager
  id
  type

  static counter = 0

  constructor(pager, type) {
    this.pager = pager
    this.id = ++PagerWrapper.counter
    this.type = type
  }

  hasMorePagers() {
    return this.pager.hasMorePagers()
  }

  nextPage() {
    this.pager = this.pager.nextPage()

    return this.pager
  }
}

function makeXmlElement(nodeName, attributes, callback) {
  let result = `<${nodeName}`
  for (const entry of Object.entries(attributes)) {
    result += ` ${entry[0]}="${entry[1]}"`
  }
  result += '>'

  if (callback) {
    for (const child of callback()) {
      result += child
    }
  }

  result += `</${nodeName}>`

  return result
}

function makeXmlTextElement(nodeName, attributes, content) {
  let result = `<${nodeName}`
  for (const entry of Object.entries(attributes)) {
    result += ` ${entry[0]}="${entry[1]}"`
  }

  result += `>${content}</${nodeName}>`

  return result
}

function makeUrl(workerId, videoId, sourceIdx, sourceType) {
  return `/@MediaUrl@/?workerId=${workerId}&videoId=${videoId}&sourceIdx=${sourceIdx}&sourceType=${sourceType}`
}

function buildAudioSet(source, workerId, videoId, sourceIdx) {
  // todo: if (Object.hasOwn(source, 'getRequestModifier')) {
  const url = makeUrl(workerId, videoId, sourceIdx, 'audio')
  return makeXmlElement(
    'AdaptationSet',
    {
      contentType: 'audio',
      mimeType: source.container,
      segmentAlignments: 'true'
    },
    () => [
      makeXmlElement(
        'Representation',
        {
          id: 'a', // todo
          codecs: source.codec,
          bandwidth: source.bitrate // ?
        },
        () => [
          makeXmlTextElement('BaseURL', {}, url),
          makeXmlElement(
            'SegmentBase',
            {
              indexRange: `${source.indexStart}-${source.indexEnd}`
            },
            () => [
              makeXmlElement('Initialization', {
                sourceUrl: url,
                range: `${source.initStart}-${source.initEnd}`
              })
            ]
          )
        ]
      )
    ]
  )
}

function buildVideoSet(source, workerId, videoId, sourceIdx) {
  const url = makeUrl(workerId, videoId, sourceIdx, 'video')
  return makeXmlElement(
    'AdaptationSet',
    {
      contentType: 'video',
      mimeType: source.container,
      segmentAlignments: 'true',
      maxWidth: source.width,
      maxHeight: source.height
    },
    () => [
      makeXmlElement(
        'Representation',
        {
          id: 'a', // todo
          codecs: source.codec,
          bandwidth: source.bitrate // ?
        },
        () => [
          makeXmlTextElement('BaseURL', {}, url),
          makeXmlElement(
            'SegmentBase',
            {
              indexRange: `${source.indexStart}-${source.indexEnd}`
            },
            () => [
              makeXmlElement('Initialization', {
                sourceUrl: url,
                range: `${source.initStart}-${source.initEnd}`
              })
            ]
          )
        ]
      )
    ]
  )
}

function buildDash(video, profile, workerId) {
  const period = makeXmlElement(
    'Period',
    {
      duration: `PT${video.duration}S`
    },
    () => {
      const adaptationSets = []
      let index = 0
      if (video.video.videoSources) {
        for (const videoSource of video.video.videoSources) {
          if (videoSource.codec !== 'vp9') { // TODO vp9 doesn't seem to work
            adaptationSets.push(buildVideoSet(videoSource, workerId, video.id.value, index))
          }
          index++
        }
      }
      index = 0
      if (video.video.audioSources) {
        for (const audioSource of video.video.audioSources) {
          adaptationSets.push(buildAudioSet(audioSource, workerId, video.id.value, index))
          index++
        }
      }
      return adaptationSets
    }
  )

  const xml =
    `<?xml version="1.0" encoding="utf-8"?>` +
    makeXmlElement(
      'MPD',
      {
        xmlns: 'urn:mpeg:dash:schema:mpd:2011',
        id: 'main.mpd',
        minBufferTime: 'PTS2',
        type: 'static',
        mediaPresentationDuration: `PT${video.duration}S`,
        profiles: profile
      },
      () => [period]
    )

  return xml
}

export default class PluginInterface {
  #source
  #id
  #serviceWorkerPort
  #pagers = new Map()
  videos = []

  constructor(source) {
    this.#source = source
  }

  registerServiceworker(data, port) {
    this.#id = data.id
    this.#serviceWorkerPort = port

    port.onmessage = async (event) => {
      switch (event.data.data.command) {
        case 'modifyVideoRequest':
          //event.data.data

          event.ports[0].postMessage(this.handleVideoRequest(event.data.data.data))
          break
      }
      console.log(event)
    }
  }

  handleSourceRequest(data) {
    if (!data.args) {
      data.args = []
    }
    switch (data.method) {
      case 'getHome':
        return this.getHome()
      default:
        if (typeof this[data.method] === 'function') {
          return this[data.method](...data.args)
        }
    }
  }

  handlePagerRequest(data) {
    if (!this.#pagers.has(data.pagerType) || !this.#pagers.get(data.pagerType).has(data.pagerId)) {
      return { error: 'Pager not found' }
    }

    const pager = this.#pagers.get(data.pagerType).get(data.pagerId)
    if (pager.id !== data.pagerId) {
      return { error: 'Unexpected pager id' }
    }
    return pager.nextPage()
  }

  findVideo(id) {
    for (const video of this.videos) {
      if (video.id.value === id) {
        return video
      }
    }
    return null
  }

  handleVideoRequest(data) {
    console.log(data)
    const video = this.findVideo(data.videoId)

    if (data.sourceType === 'video') {
      if (!video.cachedVideo[data.sourceIdx]) {
        video.cachedVideo[data.sourceIdx] =
          video.video.videoSources[data.sourceIdx].getRequestModifier()
      }

      return video.cachedVideo[data.sourceIdx].modifyRequest(
        video.video.videoSources[data.sourceIdx].url,
        data.headers
      )
    } else {
      if (!video.cachedAudio[data.sourceIdx]) {
        video.cachedAudio[data.sourceIdx] =
          video.video.audioSources[data.sourceIdx].getRequestModifier()
      }

      return video.cachedAudio[data.sourceIdx].modifyRequest(
        video.video.audioSources[data.sourceIdx].url,
        data.headers
      )
    }
  }

  getVideoDash(videoId) {
    const video = this.findVideo(videoId)
    return buildDash(video, 'urn:mpeg:dash:profile:isoff-main:2011', this.#id)
  }

  getHome() {
    const pager = new PagerWrapper(this.#source.getHome(), 'home')
    this.#addPager('home', pager, true)

    return pager
  }

  enable(config, settings, savedState) {
    return this.#source.enable(config, settings, savedState)
  }

  getContentDetails(...args) {
    const video = this.#source.getContentDetails(...args)
    video.cachedVideo = []
    video.cachedAudio = []
    this.videos.push(video)
    if (this.videos.length > 4) {
      this.videos.shift()
    }
    const tmp = JSON.parse(JSON.stringify(video))
    let index = 0
    if (tmp.video.videoSources) {
      for (const source of tmp.video.videoSources) {
        if (Object.hasOwn(source, 'getRequestModifier')) {
          source.url = makeUrl(this.#id, video.id.value, index, 'video')
        }
        index++
      }
    }
    if (tmp.video.audioSources) {
      for (const source of tmp.video.audioSources) {
        if (Object.hasOwn(source, 'getRequestModifier')) {
          source.url = makeUrl(this.#id, video.id.value, index, 'audio')
        }
        index++
      }
    }

    this.#clearPagers(videoPagers)

    return tmp
  }

  searchSuggestions(...args) {
    return JSON.parse(JSON.stringify(this.#source.searchSuggestions(...args)))
  }

  search(...args) {
    // query, type, order, filters
    const pager = new PagerWrapper(this.#source.search(...args), 'search')
    this.#addPager('search', pager, true)

    return pager
  }

  getSearchCapabilities() {
    return JSON.parse(JSON.stringify(this.#source.getSearchCapabilities()))
  }

  getLiveEvents(...args) {
    const pager = new PagerWrapper(this.#source.getLiveEvents(...args), 'live')
    this.#addPager('live', pager, true)

    return pager
  }

  getComments(...args) {
    const pager = new PagerWrapper(this.#source.getComments(...args), 'comments')
    this.#addPager('comments', pager, true)

    return pager
  }

  getSubComments(...args) {
    const pager = new PagerWrapper(this.#source.getSubComments(...args), 'subcomments')
    this.#addPager('subcomments', pager, false)

    return pager
  }

  getChannelContents(url, type, order, filters) {
    const pager = new PagerWrapper(
      this.#source.getChannelContents(url, type, order, filters),
      'channelContent_' + type
    ) // TODO!!

    this.#addPager('channelContent_' + type, pager, false)

    return pager
  }

  getChannel(...args) {
    return JSON.parse(JSON.stringify(this.#source.getChannel(...args)))
  }

  #addPager(type, pager, single) {
    if (!this.#pagers.has(type) || single) {
      this.#pagers.set(type, new Map())
    }

    this.#pagers.get(type).set(pager.id, pager)
  }

  #clearPagers(pagerTypes) {
    for (const type of pagerTypes) {
      this.#pagers.set(type, new Map())
    }
  }
}
