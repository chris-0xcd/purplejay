import { doServiceWorkerRequest } from '../utils'

class Request {
  method
  url
  headers
  useAuth
  cookies

  constructor(method, url, headers, useAuth) {
    this.method = method
    this.url = url
    this.headers = headers
    this.useAuth = useAuth
  }
}

class BatchBuilder {
  #requests = []
  #httpModule

  constructor(httpModule) {
    this.#httpModule = httpModule
  }

  GET(url, headers, useAuth) {
    this.#requests.push(new Request('GET', url, headers, useAuth))
    return this
  }

  POST(url, body, headers, useAuth) {
    this.#requests.push(new Request('POST', url, body, headers, useAuth))
    return this
  }

  execute() {
    this.addCookies()

    // eslint-disable-next-line no-undef
    const results = doServiceWorkerRequest('HttpModule', 'batchExecute', {
      requests: this.#requests
    })

    let index = 0
    for (const result of results) {
      if (this.#requests[index].useAuth) {
        this.#httpModule.processCookies(result)
      }
      index++
    }

    return results
  }

  addCookies() {
    for (const request of this.#requests) {
      if (request.useAuth) {
        request.cookies = this.#httpModule.cookiesForRequest(request.url)
      }
    }
  }
}

class SocketResult {
  #url
  #headers
  #socket
  #isOpen = false

  constructor(client, url, headers) {
    this.#url = url
    this.#headers = headers
  }

  isOpen() {
    return this.#isOpen
  }

  connect(socketObject) {
    this.#socket = new WebSocket(this.#url) // protocols? TODO headers?

    this.#socket.onopen = (event) => {
      console.log(event)
      this.#isOpen = true
      if (Object.hasOwn(socketObject, 'open')) {
        socketObject.open()
      }
    }

    this.#socket.onmessage = (event) => {
      //console.log(event)
      try {
        if (Object.hasOwn(socketObject, 'message')) {
          socketObject.message(event.data)
        }
      } catch (e) {
        /* empty */
      }
    }

    this.#socket.onclose = (event) => {
      console.log(event)
      this.#isOpen = false
      if (Object.hasOwn(socketObject, 'closed')) {
        socketObject.closed(event.code, event.reason)
      }
    }

    this.#socket.onError = (event) => {
      console.log(event)
      if (Object.hasOwn(socketObject, 'failure')) {
        socketObject.failure(event) // TODO should pass error message I think ...
      }
    }
    /*
    TODO? closing (code: int, reason: string)
     */
  }

  send(msg) {
    this.#socket?.send(msg)
  }

  // todo: close?
}

export default class PackageHttp {
  // eslint-disable-next-line no-undef
  #cookieJar = new CookieJar()

  GET(url, headers, useAuth) {
    // eslint-disable-next-line no-undef
    const response = doServiceWorkerRequest('HttpModule', 'GET', {
      url,
      headers,
      useAuth,
      cookies: useAuth ? this.cookiesForRequest(url) : []
    })

    if (useAuth) {
      this.processCookies(response)
    }

    return response
  }

  POST(url, body, headers, useAuth) {
    // eslint-disable-next-line no-undef
    const response = doServiceWorkerRequest('HttpModule', 'POST', {
      url,
      body,
      headers,
      useAuth,
      cookies: useAuth ? this.cookiesForRequest(url) : []
    })

    if (useAuth) {
      this.processCookies(response)
    }

    return response
  }

  socket(url, headers, useAuth /*todo*/) {
    return new SocketResult(null, url, headers)
  }

  batch() {
    return new BatchBuilder(this)
  }

  processCookies(response) {
    const url = new URL(response.url)

    const path = url.pathname.substring(0, url.pathname.lastIndexOf('/'))

    for (const cookie of response.cookies) {
      //console.log(cookie.trim())
      // eslint-disable-next-line no-undef
      this.#cookieJar.setCookie(new Cookie(cookie.trim(), url.host, path))
    }
  }

  cookiesForRequest(requestUrl) {
    const url = new URL(requestUrl)

    const path = url.pathname.substring(0, url.pathname.lastIndexOf('/'))
    // eslint-disable-next-line no-undef
    const accessInfo = new CookieAccessInfo(url.host, path, url.protocol === 'https:')
    const cookies = this.#cookieJar.getCookies(accessInfo)

    return cookies.map((cookie) => cookie.name + '=' + cookie.value)
  }
}
