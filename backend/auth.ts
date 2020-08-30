import request from 'request'


export class Auth {
    userData: any

    GetAuthenticateRes(userName: String, password: String, callback: Function) : void {
        request('https://authserver.mojang.com/authenticate', {
            method: 'POST',
            body: JSON.stringify({
                "agent": {
                    "name": "Minecraft",
                    "version": 1
                },
                "username": userName,
                "password": password
            })
        }, (err, res, body) => {
            
            let stat: String = ''

            if(err) {
                console.error(err)
                stat = 'CanNotConnectException'
            }
            let parsedResult: any = JSON.parse(body)
            let error: any = parsedResult.error
            console.log(error)
            if(error == undefined) {
                this.userData = parsedResult
                stat = 'Success'
            } else {
                stat = error
            }

            callback(stat)
            
        })
    }
}