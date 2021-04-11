const WeixinAuth = require("koa2-weixin-auth")
const jsonwebtoken = require("jsonwebtoken")
const WXBizDataCrypt = require('../libs/WXBizDataCrypt')

const { jwtSecret, minProgram } = require("../config")

class UserControl {
    async login(ctx) {
        const { code, encryptedData, iv } = ctx.request.body
        const weixinAuth = new WeixinAuth(minProgram.appId, minProgram.appSecret)

        const token = await weixinAuth.getAccessToken(code)
        const sessionKey = token.data.session_key
        console.log('sessionKey', token, sessionKey)
        const pc = new WXBizDataCrypt(minProgram.appId, sessionKey)

        let decryptedUserInfo = pc.decryptData(encryptedData, iv)

        let authorizationToken = jsonwebtoken.sign(
            { name: decryptedUserInfo.nickName },
            jwtSecret,
            { expiresIn: '1d' }
        )
        Object.assign(decryptedUserInfo, { authorizationToken })

        ctx.status = 200
        ctx.body = {
            code: 200,
            msg: 'ok',
            data: decryptedUserInfo
        }
    }
}

module.exports = new UserControl()