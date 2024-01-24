import { Connection } from 'jsstore'
import JsstoreWorker from 'jsstore/dist/jsstore.worker.min.js?worker'
import DatabaseSchema from './schema/databaseSchema.js'
import {inject} from "vue";

class DatabaseService {
  #connection

  constructor() {
    this.#connection = new Connection(new JsstoreWorker())
  }

  async initialize() {
    await this.#connection.initDb(DatabaseSchema)
  }

  async storePlugin(id, configuration, script, icon) {
    const data = {
      id,
      configuration,
      script,
      icon
    }

    await this.#connection.insert({
      into: 'Plugins',
      upsert: true,
      values: [data]
    })
  }

  async deletePlugin(id) {
    await this.#connection.remove({
      from: 'Plugins',
      where: {
        id: id
      }
    })
  }

  async loadPlugin(id) {
    const result = await this.#connection.select({
      from: 'Plugins',
      where: { id }
    })

    if (result.length === 0) {
      return null
    }

    return result[0]
  }

  async loadPlugins() {
    return await this.#connection.select({
      from: 'Plugins',
    })
  }

  async loadSettings() {
    const result = await this.#connection.select({
      from: 'Settings'
    })

    if (result.length === 0) {
      await this.storeSettings({})
      return await this.loadSettings()
    }

    return result[0]
  }

  async storeSettings(settings) {
    await this.#connection.insert({
      into: 'Settings',
      upsert: true,
      values: [settings]
    })
  }

  async loadPluginSortOrder() {
    const settings = await this.loadSettings()

    return settings.pluginSortOrder ?? []
  }

  async storePluginSortOrder(pluginSortOrder) {
    const settings = await this.loadSettings()
    settings.pluginSortOrder = pluginSortOrder
    await this.storeSettings(settings)
  }

  async loadPluginSettings() {
    const settings = await this.loadSettings()

    return settings.pluginSettings
  }

  async storePluginSettings(pluginSettings) {
    const settings = await this.loadSettings()
    settings.pluginSettings = pluginSettings
    await this.storeSettings(settings)
  }
}

const databaseServiceSymbol = Symbol();


export function useDatabaseService() {
  const plugin = inject(databaseServiceSymbol);
  if (!plugin) throw new Error("No databaseService provided");

  return plugin;
}

export default {
  install: (app, options) => {
    const databaseService = new DatabaseService()
    app.config.globalProperties.$databaseService = databaseService
    app.provide(databaseServiceSymbol, databaseService);
  }
}
