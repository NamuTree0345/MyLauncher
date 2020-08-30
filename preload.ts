import {ipcRenderer} from 'electron'

let clickLogin: Boolean = false

ipcRenderer.on('login_failed', (ev) => {
    document.getElementById('login').innerHTML = '로그인'
    document.getElementById('login').style.backgroundColor = 'rgb(133, 197, 68)'
    clickLogin = false
})

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('login').onclick = (ev) => {
        if(!clickLogin) {
            ipcRenderer.send('login', (<HTMLInputElement>document.getElementById('email')).value, (<HTMLInputElement>document.getElementById('password')).value)

            /*
            // readonly
            let id: HTMLInputElement = (<HTMLInputElement>document.getElementById('id'))
            id.readOnly = true

            let password: HTMLInputElement = (<HTMLInputElement>document.getElementById('password'))
            password.readOnly = true
            */

            document.getElementById('login').innerHTML = '로그인'
            document.getElementById('login').style.backgroundColor = 'gray'
            clickLogin = true
        }
    }
})
