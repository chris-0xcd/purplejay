import PluginService from '../grayjay/pluginService'
import { inject, reactive, readonly } from 'vue'
import CombinedPager from '../grayjay/combinedPager.js'
import Plugin from '../grayjay/plugin.js'

class GJPluginService {
  #plugins
  #lastPluginId
  #databaseService

  #enabledPlugins
  #availablePlugins
  #state

  constructor(databaseService) {
    //this.#plugin = new PluginService()
    this.#plugins = new Map()
    this.#databaseService = databaseService

    this.#enabledPlugins = new Map()
    this.#availablePlugins = new Map()
    this.#state = new reactive({ enabledPlugins: [], availablePlugins: [] })
  }

  async loadState() {
    let allPlugins = await this.#databaseService.loadPlugins()
    allPlugins = await Promise.all(
      allPlugins.map(async (pluginData) => {
        const plugin = new Plugin()
        await plugin.fromDatabase(pluginData)
        return plugin
      })
    )
    const allPluginsMap = new Map(allPlugins.map((obj) => [obj.id, obj]))
    let sortOrder = await this.#databaseService.loadPluginSortOrder()

    // ensure active plugins are really installed
    sortOrder = sortOrder.filter(id => allPluginsMap.has(id))

    const enabledPluginsMap = new Map(sortOrder.map((id) => [id, allPluginsMap.get(id)]))
    const availablePlugins = new Map(
      allPlugins.filter((plugin) => !enabledPluginsMap.has(plugin.id)).map((obj) => [obj.id, obj])
    )
    console.log(enabledPluginsMap)
    this.#enabledPlugins = enabledPluginsMap
    this.#availablePlugins = availablePlugins
    console.log('loading plugins')
    for (const plugin of this.#enabledPlugins.values()) {
      await this.loadPlugin(plugin.scriptConfiguration, plugin.scriptContent)
    }
    this.#updateState()
  }

  #updateState() {
    this.#state.enabledPlugins = Array.from(this.#enabledPlugins.values()).map((plugin) =>
      plugin.getInformation()
    )
    this.#state.availablePlugins = Array.from(this.#availablePlugins.values()).map((plugin) =>
      plugin.getInformation()
    )
  }

  getState() {
    return readonly(this.#state)
  }

  async disablePlugin(id) {
    if (!this.#enabledPlugins.has(id)) {
      throw new Error('Plugin not found')
    }

    const plugin = this.#enabledPlugins.get(id)
    this.#enabledPlugins.delete(id)

    this.#availablePlugins.set(id, plugin)

    await this.unloadPlugin(id)

    const pluginSortOrder = await this.#databaseService.loadPluginSortOrder()
    const index = pluginSortOrder.indexOf(id)
    if (index !== -1) {
      pluginSortOrder.splice(index, 1)
    }
    await this.#databaseService.storePluginSortOrder(pluginSortOrder)
    this.#updateState()
  }

  async enablePlugin(id) {
    if (!this.#availablePlugins.has(id)) {
      throw new Error('Plugin not found')
    }

    const plugin = this.#availablePlugins.get(id)
    this.#availablePlugins.delete(id)

    this.#enabledPlugins.set(id, plugin)

    const pluginSortOrder = await this.#databaseService.loadPluginSortOrder()
    pluginSortOrder.push(id)
    await this.#databaseService.storePluginSortOrder(pluginSortOrder)

    await this.loadPlugin(plugin.scriptConfiguration, plugin.scriptContent)
    this.#updateState()
  }

  async downloadNewPlugin(url) {
    const plugin = new Plugin()
    await plugin.download(url)

    if (this.#enabledPlugins.has(plugin.id) || this.#availablePlugins.has(plugin.id)) {
      throw new Error('Plugin with this id is already installed')
    }

    return plugin
  }

  async installPlugin(plugin) {
    // todo check if we have a plugin to install .. if ()
    if (this.#enabledPlugins.has(plugin.id) || this.#availablePlugins.has(plugin.id)) {
      throw new Error('Plugin with this id is already installed')
    }
    console.log(plugin)
    await this.#databaseService.storePlugin(
      plugin.id,
      plugin.scriptConfiguration,
      plugin.scriptContent,
      plugin.scriptIcon
    )

    const pluginSortOrder = await this.#databaseService.loadPluginSortOrder()
    pluginSortOrder.push(plugin.id)
    await this.#databaseService.storePluginSortOrder(pluginSortOrder)

    this.#enabledPlugins.set(plugin.id, plugin)
    await this.loadPlugin(plugin.scriptConfiguration, plugin.scriptContent)
    plugin.installed = true
    this.#updateState()
  }

  async uninstallPlugin(id) {
    if (this.#enabledPlugins.has(id)) {
      await this.disablePlugin(id)
    }

    if (!this.#availablePlugins.has(id)) {
      throw new Error('Plugin not found')
    }

    this.#availablePlugins.delete(id)
    await this.#databaseService.deletePlugin(id)
    this.#updateState()
  }

  getPlugin(id) {
    if (this.#enabledPlugins.has(id)) {
      return this.#enabledPlugins.get(id)
    }
    if (this.#availablePlugins.has(id)) {
      return this.#availablePlugins.get(id)
    }

    throw Error('Plugin not found')
  }

  #getPlugin(pluginId) {
    if (!this.#plugins.has(pluginId)) {
      throw new Error('Plugin not loaded')
    }

    return this.#plugins.get(pluginId)
  }

  async loadPlugin(pluginConfig, pluginScript) {
    if (this.#plugins.has(pluginConfig.id)) {
      throw new Error('Plugin already loaded')
    }

    const decoder = new TextDecoder()
    const plugin = new PluginService()
    await plugin.initialize(decoder.decode(pluginScript))
    await plugin.enable(pluginConfig)
    this.#plugins.set(pluginConfig.id, plugin)
    this.#lastPluginId = pluginConfig.id
  }

  async unloadPlugin(id) {
    const plugin = this.#getPlugin(id)
    this.#plugins.delete(id)
    await plugin.unload()
  }

  getHome() {
    const promises = []
    for (const plugin of this.#plugins.values()) {
      promises.push(plugin.getHome())
    }
    return new CombinedPager(promises)
  }

  async searchSuggestions(query) {
    if (!query || query.trim() === '') {
      return []
    }
    console.log(query)

    const promises = []
    for (const plugin of this.#plugins.values()) {
      promises.push(plugin.searchSuggestions(query))
    }
    const results = await Promise.all(promises)
    const merged = results.flat(1)
    console.log(merged)
    return merged
  }

  search(query, type, order, filters) {
    const promises = []
    for (const plugin of this.#plugins.values()) {
      promises.push(plugin.search(query, type, order, filters))
    }
    return new CombinedPager(promises)
  }

  async getSearchCapabilities(plugin) {
    return this.#getPlugin(plugin).getSearchCapabilities()
  }

  async getContentDetails(plugin, url) {
    return this.#getPlugin(plugin).getContentDetails(url)
  }

  async getLiveEvents(plugin, url) {
    return this.#getPlugin(plugin).getLiveEvents(url)
  }

  async getComments(plugin, url) {
    return this.#getPlugin(plugin).getComments(url)
  }

  async getSubComments(plugin, comment) {
    return this.#getPlugin(plugin).getSubComments(comment)
  }

  getChannelContents(plugin, url, type, order, filters) {
    return new CombinedPager([
      this.#getPlugin(plugin).getChannelContents(url, type, order, filters)
    ])
  }

  async getChannel(plugin, url) {
    return this.#getPlugin(plugin).getChannel(url)
  }

  // special functions -> todo!!
  async getVideoDash(plugin, id) {
    return this.#getPlugin(plugin).getVideoDash(id)
  }
}

const pluginServiceSymbol = Symbol()

export function usePluginService() {
  const plugin = inject(pluginServiceSymbol)
  if (!plugin) throw new Error('No pluginService provided!!!')

  return plugin
}

export default {
  install: (app, options) => {
    const pluginService = new GJPluginService(app.config.globalProperties.$databaseService) // TODO
    app.config.globalProperties.$pluginService = pluginService
    app.provide(pluginServiceSymbol, pluginService)
  }
}
