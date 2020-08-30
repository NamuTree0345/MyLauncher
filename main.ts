import { BrowserWindow, app, ipcMain, dialog } from 'electron'
import * as path from 'path'

import * as auth from './backend/auth'

// production = false
// dev = true
const dev: Boolean = true
let window: BrowserWindow

function openWindow() {
    window = new BrowserWindow({
        height: 741,
        width: 1271,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            enableRemoteModule: false
        }
    })

    window.loadFile('./index.html')
    if(dev) {
        window.loadFile('../index.html')
        window.webContents.openDevTools()
    }
}

app.whenReady().then(() => {
    openWindow()
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('login', (event, email, password) => {
    const auth_class = new auth.Auth()
    auth_class.GetAuthenticateRes(email, password)
})