import request from 'request'

export class Auth {
    GetAuthenticateRes(userName: String, password: String) : String {
        request.post('https://authserver.mojang.com/authenticate', {
            body: {
                "agent": {
                    "name": "Minecraft",
                    "version": 1
                },
                "username": userName,
                "password": password
            }
        }, (err, res, body) => {
            if(err) {
                return "CanNotConnectException"
            }
            let parsedResult: any = JSON.parse(body)
            if(parsedResult.error === undefined) {
                return "Success"
            } else {
                return parsedResult.error
            }
            
        })
        return "Unknown"
    }
}