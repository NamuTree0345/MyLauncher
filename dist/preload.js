"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
let clickLogin = false;
electron_1.ipcRenderer.on('login_failed', (ev) => {
    document.getElementById('login').innerHTML = '로그인';
    document.getElementById('login').style.backgroundColor = 'rgb(133, 197, 68)';
    clickLogin = false;
});
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('login').onclick = (ev) => {
        if (!clickLogin) {
            electron_1.ipcRenderer.send('login', document.getElementById('email').value, document.getElementById('password').value);
            /*
            // readonly
            let id: HTMLInputElement = (<HTMLInputElement>document.getElementById('id'))
            id.readOnly = true

            let password: HTMLInputElement = (<HTMLInputElement>document.getElementById('password'))
            password.readOnly = true
            */
            document.getElementById('login').innerHTML = '로그인';
            document.getElementById('login').style.backgroundColor = 'gray';
            clickLogin = true;
        }
    };
});
