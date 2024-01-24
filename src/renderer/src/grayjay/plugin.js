import * as Base64 from '@borderless/base64';

export default class Plugin {
  id
  scriptContent
  scriptConfiguration
  scriptIcon
  signatureValid
  signatureStatus
  installed

  getInformation() {
    return {
      id: this.id,
      name: this.scriptConfiguration.name,
      description: this.scriptConfiguration.description,
      icon: this.scriptIcon,
      configuration: this.scriptConfiguration,
      signatureValid: this.signatureValid,
      signatureStatus: this.signatureStatus,
      installed: this.installed
    }
  }

  async download(url) {
    this.installed = false

    // download plugin configuration
    this.scriptConfiguration = await (await fetch(url)).json()

    // ensure minimal required properties are defined
    const requiredProperties = ['name', 'sourceUrl', 'scriptUrl', 'id', 'version']
    for (const property of requiredProperties) {
      if (!Object.hasOwn(this.scriptConfiguration, property)) {
        throw new Error('Invalid plugin configuration')
      }
    }

    this.id = this.scriptConfiguration.id

    // download script
    const scriptUrl = new URL(this.scriptConfiguration.scriptUrl, this.scriptConfiguration.sourceUrl)
    this.scriptContent = await (await fetch(scriptUrl.toString())).arrayBuffer()

    const iconUrl = new URL(this.scriptConfiguration.iconUrl, this.scriptConfiguration.sourceUrl)
    this.scriptIcon =
      'data:;base64,' + Base64.encode(await (await fetch(iconUrl.toString())).arrayBuffer())
    this.signatureValid = await this.#validateSignature()
  }

  async fromDatabase(storedPlugin) {
    this.installed = true
    this.scriptConfiguration = storedPlugin.configuration
    this.scriptContent = storedPlugin.script
    this.scriptIcon = storedPlugin.icon
    this.id = this.scriptConfiguration.id

    this.signatureValid = await this.#validateSignature()
  }

  async #validateSignature() {
    if (!this.scriptConfiguration.scriptPublicKey || !this.scriptConfiguration.scriptSignature) {
      this.signatureStatus = 'Signature missing'
      return false
    }

    const keyRaw = Base64.decode(this.scriptConfiguration.scriptPublicKey)
    const signature = Base64.decode(this.scriptConfiguration.scriptSignature)

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

    const result = await window.crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      key,
      signature,
      this.scriptContent
    )

    this.signatureStatus = result ? 'Signature valid' : 'Signature invalid'

    return result
  }
}
