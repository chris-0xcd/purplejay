import PackageDOMParser from './packages/packageDOMParser.js'
import PackageBridge from './packages/packageBridge.js'
import PackageUtilities from './packages/packageUtilities.js'
import PackageHttp from './packages/packageHttp.js'
import PluginInterface from './pluginInterface.js'

let pluginInterface

async function initialize(pluginScript) {
  // TODO hack but will replace cookiejar anyways ...
  self.exports = {}
  const exports = await import('./cookiejar')
  let cookiejar
  if (!exports.default) {
    cookiejar = self.exports
  } else {
    cookiejar = exports.default
  }

  self.CookieJar = cookiejar.CookieJar
  self.Cookie = cookiejar.Cookie
  self.CookieAccessInfo = cookiejar.CookieAccessInfo

  // TODO: only register enabled packages
  self.http = new PackageHttp()
  self.domParser = new PackageDOMParser()
  self.bridge = new PackageBridge()
  self.utilities = new PackageUtilities()

  const sourceScript = await import('./source?raw')
  const source = eval(sourceScript.default + '\n' + pluginScript + '\n source')

  pluginInterface = new PluginInterface(source)
}

addEventListener('message', async function (e) {
  let result = {}
  switch (e.data.type) {
    case 'initialize':
      await initialize(e.data.args[0])
      break
    case 'registerServiceworker':
      pluginInterface.registerServiceworker(e.data, e.ports[0])
      break
    case 'source':
      result = pluginInterface.handleSourceRequest(e.data)
      break
    case 'pager':
      result = pluginInterface.handlePagerRequest(e.data)
      break
    case 'video':
      result = pluginInterface.handleVideoRequest(e.data)
      break
  }

  e.ports[0].postMessage(result)
})
