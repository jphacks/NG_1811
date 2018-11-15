import { app, BrowserWindow } from "electron"

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
    global.__static = require("path")
        .join(__dirname, "/static")
        .replace(/\\/g, "\\\\")
}

const winURL =
    process.env.NODE_ENV === "development"
        ? `http://localhost:9080`
        : `file://${__dirname}/index.html`

let mainWindow
function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        width: 700,
        height: 500,
        useContentSize: true,
        titleBarStyle: "hiddenInset",
        frame: false,
        transparent: true,
        vibrancy: "dark"
    })

    mainWindow.loadURL(winURL)

    mainWindow.on("closed", () => {
        mainWindow = null
    })
}

let subWindow
function createSubWindow() {
    /**
     * Initial window options
     */
    subWindow = new BrowserWindow({
        width: 400,
        height: 300,
        useContentSize: true,
        // titleBarStyle: "hidden",
        alwaysOnTop: true,
        frame: false,
        transparent: true,
        vibrancy: "dark"
    })

    subWindow.loadURL(winURL + "#/sub")

    subWindow.on("closed", () => {
        mainWindow = null
    })
}

app.on("ready", createWindow)
app.on("ready", createSubWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow()
    }
    if (subWindow === null) {
        subWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */



 // メインプロセスでやりとりするipcMain
const {ipcMain} = require('electron');

ipcMain.on('candidateList', (event, list) => {
    subWindow.webContents.send('candidateList', list);


})

ipcMain.on('inputBlock', (event, block) => {
    mainWindow.webContents.send('inputBlock', block);
})


ipcMain.on('setSubWindowBounds', (event, r) => {
    const a = mainWindow.getPosition();
    subWindow.setPosition(Math.ceil(r.x + a[0] - 17), Math.ceil(r.y + a[1] + 24));
})


ipcMain.on('onfocus', (event) => {
    subWindow.showInactive();
})
ipcMain.on('onblur', (event) => {
    subWindow.hide();
})
