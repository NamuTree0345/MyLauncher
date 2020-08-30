"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const request_1 = __importDefault(require("request"));
class Auth {
    GetAuthenticateRes(userName, password, callback) {
        request_1.default('https://authserver.mojang.com/authenticate', {
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
            let stat = '';
            if (err) {
                console.error(err);
                stat = 'CanNotConnectException';
            }
            let parsedResult = JSON.parse(body);
            let error = parsedResult.error;
            console.log(error);
            if (error == undefined) {
                this.userData = parsedResult;
                stat = 'Success';
            }
            else {
                stat = error;
            }
            callback(stat);
        });
    }
}
exports.Auth = Auth;
