export function doServiceWorkerRequest(module, method, data) {
  const request = new XMLHttpRequest()

  request.open('post', '/@' + module + '@/', false)
  request.setRequestHeader('cache-control', 'no-cache, no-store, max-age=0')
  request.setRequestHeader('Content-type', 'application/json')

  request.send(
    JSON.stringify({
      method,
      data
    })
  )

  const result = JSON.parse(request.responseText)

  if (Object.hasOwn(result, 'exception')) {
    const e = new Error(result.exception.message)
    e.name = result.exception.name
    throw e
  }

  return result.response
}
