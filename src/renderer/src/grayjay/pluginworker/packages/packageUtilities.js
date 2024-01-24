export default class PackageUtilities {
  toBase64(bytes) {
    return btoa(String.fromCodePoint(...bytes))
  }

  randomUUID() {
    return self.crypto.randomUUID()
  }
}
