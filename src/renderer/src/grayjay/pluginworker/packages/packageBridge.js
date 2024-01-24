export default class PackageBridge
{
  toast(string) {
    // TODO
    console.log('TOAST: ' + string)
  }

  log(string) {
    // TODO
    console.log(string)
  }

  throwTest(string) {
    throw new Error(string)
  }

  isLoggedIn() {
    // TODO
    return false
  }
}
