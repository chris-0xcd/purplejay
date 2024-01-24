import PluginService from './pluginService'

export default class PagerBase {
  id;
  type;
  pager;
  #pluginService;

  constructor(data, pluginService) {
    this.id = data.id
    this.type = data.type
    this.pager = data.pager

    this.#pluginService = pluginService
  }

  hasMorePagers() {
    return this.pager.hasMore
  }

  async nextPage() {
    this.pager = await this.#pluginService.callWorker({
      type: 'pager',
      method: 'nextPage',
      pagerType: this.type,
      pagerId: this.id
    })

    return this
  }
}
