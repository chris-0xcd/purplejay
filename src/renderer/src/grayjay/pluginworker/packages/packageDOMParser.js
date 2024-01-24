import {DOMParser} from 'linkedom'

export default class PackageDOMParser {
  parseFromString(string, mimeType) {
    if (!mimeType) {
      mimeType = 'text/html'
    }

    const parser = new DOMParser()
    return parser.parseFromString(string, mimeType)
  }
}
