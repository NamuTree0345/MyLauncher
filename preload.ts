import {ipcRenderer} from 'electron'

let clickLogin: Boolean = false

function getMeta(metaName: String) : String {
    const metas = document.getElementsByTagName('meta');
  
    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === metaName) {
        return metas[i].getAttribute('content');
      }
    }
  
    return '';
  }

ipcRenderer.on('login_failed', (ev) => {
    document.getElementById('login').innerHTML = '로그인'
    document.getElementById('login').style.backgroundColor = 'rgb(133, 197, 68)'
    clickLogin = false
})

document.addEventListener("DOMContentLoaded", () => {
    console.log(getMeta('page'))
    switch(getMeta('page')) {
        case 'login':
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
        case 'main':
            break
    }
    
})
