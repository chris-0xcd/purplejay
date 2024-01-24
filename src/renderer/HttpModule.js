//import got from 'got'

const ALLOWED_HEADERS = {
  'cache-control': true,
  'connection': true,
  'content-disposition': true,
  'content-encoding': true,
  'content-length': true,
  'content-type': true,
  'date': true,
  'etag': true,
  'last-modified': true,
}

export default class HttpModule {
  async handleRequest(data) {
    let result

    try {
      switch (data.method) {
        case 'GET':
          result = await this.GET(
            data.data.url,
            data.data.headers,
            data.data.useAuth,
            data.data.cookies
          )
          break
        case 'POST':
          result = await this.POST(
            data.data.url,
            data.data.body,
            data.data.headers,
            data.data.useAuth,
            data.data.cookies
          )
          break
        case 'batchExecute':
          result = await this.batchExecute(data.data.requests)
          break
        default:
          throw new Error('Invalid method')
      }
      result = {
        response: result
      }
    } catch (e) {
      console.log(e)
      if (!(e instanceof Error)) {
        // eslint-disable-next-line no-ex-assign
        e = new Error(e)
      }
      result = {
        exception: {
          message: e.message,
          name: e.name
        }
      }
    }

    return result
  }

  async GET(url, headers, useAuth, cookies) {
    return this.#request('GET', url, undefined, headers, cookies)
  }

  async POST(url, body, headers, useAuth, cookies) {
    return this.#request('POST', url, body, headers, cookies)
  }

  async #request(method, url, body, headers, cookies) {
    let hasUserAgent = false
    for (const header of Object.getOwnPropertyNames(headers)) {
      if (header.toLowerCase() === 'user-agent') {
        hasUserAgent = true
      }
    }
    if (!hasUserAgent) {
      headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0'
    }

    if (cookies?.length > 0) {
      headers['cookie'] = cookies
      // console.log(cookies)
    }

    let response

    const start = performance.now()
    try {
      response = await fetch (url, {
        method,
        body,
        headers
      })
    } catch (e) {
      response = e.response
    }
    const responseText = await response?.text()
    const duration = performance.now() - start
    console.log(url + ': ' + duration)

    const responseHeaders = {}
    let responseCookies = []

    if (response) {
      for (const header of Object.entries(response.headers)) {
        const name = header[0]
        const value = header[1]
        //console.log(name);

        if (Object.hasOwn(ALLOWED_HEADERS, name)) {
          responseHeaders[name] = value
        }
        if (name === 'set-cookie') {
          responseCookies = value
        }
      }
    }

    const res= {
      url: response ? response.url : url,
      code: response?.status,
      body: responseText,
      headers: responseHeaders,
      isOk: response ? response.ok : false,
      cookies: responseCookies
    }

    //console.log(res)

    return res
  }

  async batchExecute(requests) {
    const promises = []

    for (const request of requests) {
      promises.push(this.#handleBatch(request))
    }
    return Promise.all(promises)
  }

  async #handleBatch(request) {
    switch (request.method) {
      case 'GET':
        return this.GET(request.url, request.headers, request.useAuth, request.cookies)
      default:
        throw new Error('Unexpected method: ' + request.method)
    }
  }
}
