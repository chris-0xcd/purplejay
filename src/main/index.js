import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import HttpModule from './modules/HttpModule'

function registerCorsIntercepts(mainWindow) {
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
    if (Object.hasOwn(details.requestHeaders, '_User-Agent')) {
      details.requestHeaders['User-Agent'] = details.requestHeaders['_User-Agent']
      delete details.requestHeaders['_User-Agent']
    } else {
      details.requestHeaders['User-Agent'] =
        'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0'
    }

    if (Object.hasOwn(details.requestHeaders, '_Cookie')) {
      details.requestHeaders['Cookie'] = details.requestHeaders['_Cookie']
      delete details.requestHeaders['_Cookie']
    }

    const filtered = Object.keys(details.requestHeaders)
      .filter(
        (key) =>
          !key.toLowerCase().startsWith('sec-') || key.toLowerCase().startsWith('sec-websocket')
      )
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: details.requestHeaders[key]
        }
      }, {})

    // TODO
    delete filtered['Origin']
    delete filtered['Referer']

    callback({ cancel: false, requestHeaders: filtered })
  })

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    //console.log(details)
    if (details.responseHeaders) {
      // cors preflight requires 200 response, change status and add allow header
      if (details.method === 'OPTIONS' && details.statusCode !== 200) {
        details.statusLine = 'HTTP/1.1 200 OK'
        details.responseHeaders.Allow = ['HEAD,GET,POST,OPTIONS']
      }

      // remove existing access-control headers because they might use different case
      //  -> multiple headers with different case cause the preflight to fail.
      const headersToDelete = []

      for (const header in details.responseHeaders) {
        if (
          header.toLowerCase() === 'access-control-allow-origin' ||
          header.toLowerCase() === 'access-control-allow-headers' ||
          header.toLowerCase() === 'access-control-expose-headers'
        ) {
          headersToDelete.push(header)
        }
      }

      let cookiesCopy = []
      for (const header in details.responseHeaders) {
        if (header.toLowerCase() === 'set-cookie') {
          cookiesCopy = details.responseHeaders[header]
        }
      }

      for (const header of headersToDelete) {
        delete details.responseHeaders[header]
      }

      details.responseHeaders['Access-Control-Allow-Origin'] = ['*']
      details.responseHeaders['Access-Control-Allow-Headers'] = ['*']
      details.responseHeaders['Access-Control-Expose-Headers'] = ['*']

      details.responseHeaders['_Set-Cookie'] = cookiesCopy
    }

    callback({
      responseHeaders: details.responseHeaders,
      statusLine: details.statusLine
    })
  })
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      sandbox: false,
      /*webSecurity: false */
    }
  })

  mainWindow.webContents.session.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0'
  )

  registerCorsIntercepts(mainWindow)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.webContents.openDevTools()
}

const httpModule = new HttpModule()

ipcMain.handle('module', async (event, ...args) => {
  if (args[0].module === 'HttpModule') {
    return await httpModule.handleRequest(args[0].data)
  }

  return {
    msg: 'test'
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
