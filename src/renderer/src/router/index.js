import { createRouter, createWebHashHistory } from 'vue-router'
import MainScreen from '../screens/MainScreen.vue'
import VideoScreen from '../screens/VideoScreen.vue'
import SearchScreen from '../screens/SearchScreen.vue'
import ChannelScreen from '../screens/ChannelScreen.vue'
import PluginsScreen from '../screens/PluginsScreen.vue'

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      component: MainScreen,
      meta: {
        titleKey: 'title.main'
      }
    },
    {
      path: '/video',
      component: VideoScreen,
      meta: {
        titleKey: 'title.main'
      }
    },
    {
      path: '/search',
      component: SearchScreen
    },
    {
      path: '/channel',
      component: ChannelScreen
    },
    {
      path: '/plugins',
      component: PluginsScreen
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})
