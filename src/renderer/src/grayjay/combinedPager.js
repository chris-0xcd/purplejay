import {reactive, ref} from 'vue'

export default class CombinedPager {
  #numPagers
  #items
  #pendingResolvedByPlugin
  #promises
  #pluginsWithAvailableData
  #first
  #completedPlugins

  constructor(promises) {
    this.#numPagers = promises.length
    this.#items = reactive([])
    this.#pendingResolvedByPlugin = Array.from(Array(this.#numPagers), () => [])
    this.#promises = promises
    this.#pluginsWithAvailableData = this.#numPagers
    this.#first = true
    this.#completedPlugins = new Map()
  }

  getItems() {
    return this.#items
  }

  hasMorePagers() {
    return this.#pluginsWithAvailableData > 0
  }

  async fetchPage() {
    console.log('fetchPage...')

    const numPerPlugin = 10 // todo
    for (let itemIndex = 0; itemIndex < numPerPlugin; itemIndex++) {
      for (let pluginIndex = 0; pluginIndex < this.#numPagers; pluginIndex++) {
        if (this.#completedPlugins.has(pluginIndex)) {
          continue
        }
        const item = ref({
          loading: true
        })
        this.#pendingResolvedByPlugin[pluginIndex].push(item)
        this.#items.push(item)
      }
    }

    if (!this.#first) {
      await Promise.all(this.#promises)
      console.log('after wait for all promises')
    }
    this.#first = false

    const handle = (pluginIndex) => {
      const pendingResolve = this.#pendingResolvedByPlugin[pluginIndex]
      return (result) => {
        console.log('handle: ' + pluginIndex)
        console.log(result)
        while (pendingResolve.length && result.pager.results.length) {
          const item = pendingResolve.shift()
          item.value = result.pager.results.shift()
          item.value.loading = false
        }
        if (pendingResolve.length && !result.hasMorePagers()) {
          this.#pluginsWithAvailableData--
          this.#completedPlugins.set(pluginIndex, true)
          console.log('reached end, has pending ' + pluginIndex)
          for (let index = 0; index < pendingResolve.length; index++) {
            this.#items.splice(this.#items.indexOf(pendingResolve[index]), 1)
          }
          pendingResolve.length = 0
        } else if (!result.pager.results.length && result.hasMorePagers()) {
          console.log('calling next page ' + pluginIndex)
          this.#promises[pluginIndex] = result.nextPage(); //.then(handle(pluginIndex)) // todo ....
          this.#promises[pluginIndex].then(handle(pluginIndex))
        } else {
          console.log('remaining ' + result.pager.results.length + ' ' + pluginIndex)
        }
      }
    }

    let index = 0
    for (const promise of this.#promises) {
      promise.then(handle(index))
      index++
    }
  }
}
