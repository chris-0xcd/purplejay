import { inject } from 'vue'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

const timeAgoSymbol = Symbol()

export function useTimeAgo() {
  const plugin = inject(timeAgoSymbol)
  if (!plugin) throw new Error('No timeAgo provided')

  return plugin;
}

export default {
  install: (app, options) => {
    TimeAgo.addDefaultLocale(en)

    const timeAgo = new TimeAgo('en-US')
    app.config.globalProperties.$timeAgo = timeAgo
    app.provide(timeAgoSymbol, timeAgo);
  }
}
