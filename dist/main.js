"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const auth = __importStar(require("./backend/auth"));
// production = false
// dev = true
const dev = true;
let window;
function openWindow() {
    window = new electron_1.BrowserWindow({
        height: 741,
        width: 1271,
        minWidth: 600,
        minHeight: 682,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            enableRemoteModule: false
        }
    });
    window.loadFile('./index.html');
    if (dev) {
        window.loadFile('../index.html');
        window.webContents.openDevTools();
    }
}
electron_1.app.whenReady().then(() => {
    openWindow();
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.ipcMain.on('login', (event, email, password) => {
    const auth_class = new auth.Auth();
    const status = auth_class.GetAuthenticateRes(email, password, (status) => {
        if (status === 'Success') {
            const userData = auth_class.userData;
            electron_1.dialog.showMessageBoxSync({ message: '안녕하세요! ' + userData.selectedProfile.name + '님!', title: 'MyLauncher' });
            //window.setPreload 
            window.loadFile('./launcher.html');
            if (dev) {
                window.loadFile('../launcher.html');
            }
            return;
        }
        else if (status === 'CanNotConnectException') {
            electron_1.dialog.showErrorBox('오류', '모장 인증 서버에 접속할 수 없습니다.');
        }
        else if (status === 'ForbiddenOperationException') {
            electron_1.dialog.showErrorBox('오류', '이메일이나 비밀번호가 틀렸습니다.');
        }
        else if (status === 'Unknown') {
            electron_1.dialog.showErrorBox('오류', '알 수 없는 런처 내부 오류가 발생하였습니다.');
        }
        else {
            electron_1.dialog.showErrorBox('오류', '알 수 없습니다. ' + status);
        }
        event.reply('login_failed');
        return;
    });
});
