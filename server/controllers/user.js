const jsonwebtoken = require("jsonwebtoken")
const WeixinAuth = require("../libs/WeixinAuth")
const WXBizDataCrypt = require('../libs/WXBizDataCrypt')

const { jwtSecret, minProgram } = require("../config")
const User = require("../database/model/User")
const SessionKey = require("../database/model/SessionKey")

class UserControl {
    /**
     * 用户登录
     * @param {*} ctx 
     */
    async login(ctx) {
        const { code, encryptedData, iv, sessionKeyIsValid } = ctx.request.body
        const weixinAuth = new WeixinAuth(minProgram.appId, minProgram.appSecret)
        const token = await weixinAuth.getAccessToken(code)
        const { session_key, openid } = token.data
        const pc = new WXBizDataCrypt(minProgram.appId, session_key)

        let decryptedUserInfo = pc.decryptData(encryptedData, iv)

        let authorizationToken = jsonwebtoken.sign(
            { name: decryptedUserInfo.nickName },
            jwtSecret,
            { expiresIn: '1d' }
        )
        Object.assign(decryptedUserInfo, {
            authorizationToken,
            openId: openid
        })

        // 查询当前登录用户是否创建，否则创建
        let user = await User.findOne({ where: { openId: decryptedUserInfo.openId } })
        if (!user) {
            let createUser = await User.create(decryptedUserInfo)
            if (createUser) {
                user = createUser.dataValues
            }
        }
        let sessionKey = ""
        let sessionKeyRecord = await SessionKey.findOne({ where: { uid: user.id } })
        console.log("sessionKeyRecord", sessionKeyRecord)

        // if (sessionKeyRecord) {
        //     await SessionKey.update({ sessionKey: sessionKeyRecord })
        // } else {
        //     let sessionKeyCreateRes = await SessionKey.create({
        //         uid: user.id,
        //         sessionKey: sessionKey
        //     })
        // }
        
        ctx.status = 200
        ctx.body = {
            code: 200,
            msg: 'ok',
            data: decryptedUserInfo
        }
    }
}

module.exports = new UserControl()