import electron, { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const mainAvailChannels = ['msgRequestGetVersion', 'msgOpenExternalLink', 'http', 'module']

// Custom APIs for renderer
const api = {
  invoke: async (channel, ...data) => {
    if (mainAvailChannels.includes(channel)) {
      const result = await electron.ipcRenderer.invoke.apply(null, [channel, ...data]);
      return result;
    }
    throw new Error(`Invoke failed: Unknown ipc channel name: ${channel}`);
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('mainApi', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
