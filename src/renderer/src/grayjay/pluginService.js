import PagerBase from './pagerBase.js'
import { v4 as uuidv4 } from 'uuid'
import PluginWorker from './pluginworker/pluginWorker?worker'

export default class PluginService {
  #worker
  #config

  constructor() {
    this.#worker = new PluginWorker() //new Worker(new URL('./pluginworker/pluginWorker.js', import.meta.url), {type: "module"})
  }

  async initialize(pluginScript) {
    // load the plugin script in the worker
    await this.callWorker({
      type: 'initialize',
      args: [pluginScript]
    })

    // register plugin with service worker and vice versa, not sure if it is possible to get the worker id from here
    // so just use an uuid instead
    const pluginId = uuidv4()
    const channel = new MessageChannel()
    window.serviceworker.postMessage({ message: 'registerPlugin', id: pluginId }, [channel.port2])
    this.#worker.postMessage({ type: 'registerServiceworker', id: pluginId }, [channel.port1])
  }

  async unload() {
    // todo: store plugin state and terminate more gracefully?
    this.#worker.terminate()
  }

  async load(url) {
    const response = await fetch(url)
    const config = await response.json()
    console.log(config)
    this.#config = config
  }

  async validateSignature(data) {
    const keyRaw = Uint8Array.from(atob(this.#config.scriptPublicKey), (m) => m.codePointAt(0))
    const signature = Uint8Array.from(atob(this.#config.scriptSignature), (m) => m.codePointAt(0))

    let key = await crypto.subtle.importKey(
      'spki',
      keyRaw,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-512'
      },
      false,
      ['verify']
    )

    return await window.crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, signature, data)
  }

  async testScript() {
    const url = new URL(this.#config.scriptUrl, this.#config.sourceUrl)
    console.log(url.toString())
    const response = await fetch(url.toString())
    const scriptContent = await response.arrayBuffer()
    const result = await this.validateSignature(scriptContent)
    console.log(result)
    return result
  }

  // custom
  async getVideoDash(videoId) {
    return await this.callWorker({
      type: 'source',
      method: 'getVideoDash',
      args: [videoId]
    })
  }

  // args: config, settings, saveState
  async enable(...args) {
    return await this.callWorker({
      type: 'source',
      method: 'enable',
      args
    })
  }

  // returns string
  async saveState() {
    return await this.callWorker({
      type: 'source',
      method: 'saveState'
    })
  }

  // returns Pager PlatformContent
  async getHome() {
    const result = await this.callWorker({
      type: 'source',
      method: 'getHome'
    })

    return new PagerBase(result, this)
  }

  // args: query, returns string[]
  async searchSuggestions(...args) {
    return await this.callWorker({
      type: 'source',
      method: 'searchSuggestions',
      args
    })
  }

  // returns ResultCapabilities
  async getSearchCapabilities() {
    return await this.callWorker({
      type: 'source',
      method: 'getSearchCapabilities'
    })
  }

  // args: query, type, order, filters returns Pager<PlatformContent>
  async search(...args) {
    const result = await this.callWorker({
      type: 'source',
      method: 'search',
      args
    })

    return new PagerBase(result, this) // SearchItemSectionVideoPager | []
  }

  // returns ResultCapabilities
  async getSearchChannelContentsCapabilities() {
    return await this.callWorker({
      type: 'source',
      method: 'getSearchChannelContentsCapabilities'
    })
  }

  // args: channelUrl, query, type, order, filters returns Pager<PlatformContent>
  async searchChannelContents(...args) {
    const result = await this.callWorker({
      type: 'source',
      method: 'searchChannelContents',
      args
    })

    return new PagerBase(result, this) // RichGridPager
  }

  // args: query returns Pager<PlatformAuthorLink>
  async searchChannels(...args) {
    const result = await this.callWorker({
      type: 'source',
      method: 'searchChannels',
      args
    })

    return new PagerBase(result, this) // SearchItemSectionChannelPager | []
  }

  // args: url returns bool
  async isChannelUrl(...args) {
    return await this.callWorker({
      type: 'source',
      method: 'isChannelUrl',
      args
    })
  }

  // args: channelUrl returns IPlatformChannel
  async getChannel(...args) {
    return await this.callWorker({
      type: 'source',
      method: 'getChannel',
      args
    })
  }

  // returns ResultCapabilities
  async getChannelCapabilities() {
    return await this.callWorker({
      type: 'source',
      method: 'getChannelCapabilities'
    })
  }

  // args: channelUrl, type, order, filters returns IPager<IPlatformContent>
  async getChannelContents(...args) {
    const result = await this.callWorker({
      type: 'source',
      method: 'getChannelContents',
      args
    })

    return new PagerBase(result, this) // VideoPager | RichGridPager
  }

  // args: claimType, claimValues returns string?
  async getChannelUrlByClaim(...args) {
    return await this.callWorker({
      type: 'source',
      method: 'getChannelUrlByClaim',
      args
    })
  }

  // returns map[int,map[int,string]]
  async getChannelTemplateByClaimMap() {
    return await this.callWorker({
      type: 'source',
      method: 'getChannelTemplateByClaimMap'
    })
  }

  // args: url returns bool
  async isContentDetailsUrl(...args) {
    return await this.callWorker({
      type: 'source',
      method: 'isContentDetailsUrl',
      args
    })
  }

  // args: url returns PlatformContentDetails
  async getContentDetails(...args) {
    return await this.callWorker({
      type: 'source',
      method: 'getContentDetails',
      args
    })
  }

  // args: url returns List<Chapters>
  async getContentChapters(...args) {
    return await this.callWorker({
      type: 'source',
      method: 'getContentChapters',
      args
    })
  }

  // args: url returns PlaybackTracker -> TODO!!!
  async getPlaybackTracker(...args) {
    return await this.callWorker({
      type: 'source',
      method: 'getPlaybackTracker',
      args
    })
  }

  // args: url returns: Pager<PlatformContent>
  async getComments(...args) {
    const result = await this.callWorker({
      type: 'source',
      method: 'getComments',
      args
    })

    return new PagerBase(result, this)
  }

  // args: comment returns: Pager<PlatformContent>
  async getSubComments(...args) {
    const result = await this.callWorker({
      type: 'source',
      method: 'getSubComments',
      args
    })

    return new PagerBase(result, this)
  }

  // args url returns: LiveChatWindowDescriptor TODO!
  async getLiveChatWindow(...args) {
    return await this.callWorker({
      type: 'source',
      method: 'getLiveChatWindow',
      args
    })
  }

  // args: url returns: Pager<PlatformLiveEvent> TODO
  async getLiveEvents(...args) {
    const result = await this.callWorker({
      type: 'source',
      method: 'getLiveEvents',
      args
    })

    return new PagerBase(result, this)
  }

  // args: query, type, order, filters, channelId returns: Pager<PlatformContent>
  async searchPlaylists(...args) {
    const result = await this.callWorker({
      type: 'source',
      method: 'searchPlaylists',
      args
    })

    return new PagerBase(result, this)
  }

  // args: url returns: bool
  async isPlaylistUrl(...args) {
    return await this.callWorker({
      type: 'source',
      method: 'isPlaylistUrl',
      args
    })
  }

  // args: url, returns: PlatformPlaylistDetails TODO
  async getPlaylist(...args) {
    return await this.callWorker({
      type: 'source',
      method: 'getPlaylist',
      args
    })
  }

  // returns: string[]
  async getUserPlaylists() {
    return await this.callWorker({
      type: 'source',
      method: 'getUserPlaylists'
    })
  }

  // returns: string[]
  async getUserSubscriptions() {
    return await this.callWorker({
      type: 'source',
      method: 'getUserSubscriptions'
    })
  }

  async callWorker(data) {
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel()
      channel.port1.onmessage = (event) => {
        if (event.data && event.data.error) {
          reject(event.data)
        } else {
          resolve(event.data)
        }
      }
      this.#worker.postMessage(data, [channel.port2])
    })
  }
}
