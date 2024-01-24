import { APIMethods, Models, Protocol, Util } from '@polycentric/polycentric-core'
import * as Base64 from '@borderless/base64'

export class Comments {
  #cursor
  #reference
  pager

  constructor() {
    this.#cursor = undefined
    this.pager = { results: [] }
  }

  hasMorePagers() {
    return this.#cursor
  }

  async nextPage() {
    if (this.hasMorePagers()) {
      await this.#fetchPage()
    }
  }

  async loadInitial(id) {
    const buffer = new TextEncoder('utf-8').encode(id)
    await this.loadInitialByRef(Models.bufferToReference(buffer))
  }

  async loadInitialByRef(reference) {
    this.#reference = reference
    await this.#fetchPage()
  }

  async #fetchPage() {
    const response = await APIMethods.getQueryReferences(
      'https://srv1-stg.polycentric.io',
      this.#reference,
      this.#cursor,
      {
        fromType: Models.ContentType.ContentTypePost,
        countLwwElementReferences: [
          {
            fromType: Models.ContentType.ContentTypeOpinion,
            value: Models.Opinion.OpinionLike
          },
          {
            fromType: Models.ContentType.ContentTypeOpinion,
            value: Models.Opinion.OpinionDislike
          }
        ],
        countReferences: [
          {
            fromType: Models.ContentType.ContentTypePost
          }
        ]
      }
    )

    this.#cursor = response.cursor

    this.pager.results = []
    for (const item of response.items) {
      if (item.event === undefined) {
        throw new Error('expected event')
      }
      const signedEvent = Models.SignedEvent.fromProto(item.event)
      const event = Models.Event.fromBuffer(signedEvent.event)
      if (!event.contentType.equals(Models.ContentType.ContentTypePost)) {
        continue
      }

      let post = Protocol.Post.decode(event.content)
      const likes = item.counts[0].toNumber()
      const dislikes = item.counts[1].toNumber()
      const replies = item.counts[2].toNumber()

      let events = await APIMethods.getQueryLatest('https://srv1-stg.polycentric.io', event.system, [
        Models.ContentType.ContentTypeAvatar,
        Models.ContentType.ContentTypeUsername
      ])

      events = events.events.map((e) => Models.Event.fromBuffer(e.event))
      let username = ''
      let thumbnail = ''
      for (const event of events) {
        if (event.contentType.equals(Models.ContentType.ContentTypeUsername)) {
          //console.log(Util.decodeText(event?.lwwElement?.value))
          if (event?.lwwElement?.value) {
            username = Util.decodeText(event?.lwwElement?.value)
          }
        } else if (event.contentType.equals(Models.ContentType.ContentTypeAvatar)) {
          const imageBundle = Protocol.ImageBundle.decode(event?.lwwElement?.value)
          console.log(imageBundle)

          const manifest = imageBundle.imageManifests[0]
          const process = Models.Process.fromProto(manifest.process)
          console.log(process)

          const data = Protocol.URLInfoDataLink.encode(
            Protocol.URLInfoDataLink.create({
              system: event.system,
              process: manifest.process,
              servers: ['https://srv1-stg.polycentric.io'],
              byteCount: manifest.byteCount,
              sections: manifest.sections,
              mime: manifest.mime
            })
          ).finish()
          const part = Base64.encodeUrl(data)
          thumbnail = '/@polycentric@/' + part
        }
      }
      // todo missing lots of properties
      const comment = {
        plugin_type: 'Comment',
        contextUrl: '',
        author: {
          id: {
            platform: 'polycentric'
          },
          name: username,
          //url: ,
          thumbnail: thumbnail
        },
        message: post.content,
        rating: {},
        date: event.unixMilliseconds.toNumber(),
        replyCount: replies,
        context: {},
        reference: Models.pointerToReference(Models.signedEventToPointer(signedEvent))
      }

      this.pager.results.push(comment)
      console.log(events)
    }
  }
}
