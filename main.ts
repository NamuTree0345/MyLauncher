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
        minWidth: 600,
        minHeight: 682,
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
    const status = auth_class.GetAuthenticateRes(email, password, (status) => {
        if(status === 'Success') {
            const userData = auth_class.userData
            dialog.showMessageBoxSync({message: '안녕하세요! ' + userData.selectedProfile.name + '님!', title: 'MyLauncher'})
            //window.setPreload 
            window.loadFile('./launcher.html')
            if(dev) {
                window.loadFile('../launcher.html')
            }
            return
        } else if(status === 'CanNotConnectException') {
            dialog.showErrorBox('오류', '모장 인증 서버에 접속할 수 없습니다.')
        } else if(status === 'ForbiddenOperationException') {
            dialog.showErrorBox('오류', '이메일이나 비밀번호가 틀렸습니다.')
        } else if(status === 'Unknown') {
            dialog.showErrorBox('오류', '알 수 없는 런처 내부 오류가 발생하였습니다.')
        } else {
            dialog.showErrorBox('오류', '알 수 없습니다. ' + status)
        }
        event.reply('login_failed')
        return
    })
    

})