import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import pluginService from './plugins/pluginService'
import databaseService from './plugins/databaseService.js'
import timeAgo from './plugins/timeAgo.js'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { doServiceWorkerRequest } from './grayjay/pluginworker/utils'

navigator.serviceWorker.register('./ServiceWorker.js', { type: 'module' }).then(function (reg) {
  if (!reg.active) {
    location.reload()
    console.log('not active...')
  } else {
    console.log(reg.state)
    setTimeout(async () => {
      await init(reg.active)
    }, 1000)
  }
})

navigator.serviceWorker.addEventListener('message', async (event) => {
  console.log(event.data)
})


function registerWithServiceWorker(worker) {
  const channel = new MessageChannel()
  channel.port1.onmessage = async (event) => {
    if (event.data.data && event.data.data.request === 'module') {
      const res = await window.mainApi.invoke('module', event.data.data)

      event.ports[0].postMessage(res)
    }
  }

  worker.postMessage({ message: 'registerMain' }, [channel.port2])
  window.serviceworker = worker
}

navigator.serviceWorker.addEventListener('controllerchange', async (event) => {
  console.log('controller change')
  console.log(event)
  registerWithServiceWorker(navigator.serviceWorker.controller)
})



async function init(worker) {
  console.log('init')
  console.log(worker)

  registerWithServiceWorker(worker)

  const app = createApp(App)

  app.use(databaseService)
  app.use(pluginService)
  app.use(timeAgo)
  app.use(VueVirtualScroller)

  await app.config.globalProperties.$databaseService.initialize()
  await app.config.globalProperties.$databaseService.loadSettings()
  await app.config.globalProperties.$pluginService.loadState()

  app.use(vuetify).use(router)
  app.use(VueVideoPlayer)
  app.mount('#app')
}
