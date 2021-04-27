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

        let sessionKey = ""
        let openId = ""
        // 如果客户端有token， 解析token
        if (sessionKeyIsValid) {
            let token = ctx.request.header.authorization
            token = token.split(' ')[1]
            if (token) {
                let payload = await jsonwebtoken.verify(token, jwtSecret)
                if (payload && payload.sessionKey) {
                    sessionKey = payload.sessionKey
                    openId = payload.openId
                }
            }
        }
        // 如果从token中没有取到，则从服务器上取一次
        if (!sessionKey) {
            // 目前微信的 session_key, 有效期3天
            const token = await weixinAuth.getAccessToken(code)
            const { session_key, openid } = token.data
            sessionKey = session_key
            openId = openid
        }

        const pc = new WXBizDataCrypt(minProgram.appId, sessionKey)
        let decryptedUserInfo = pc.decryptData(encryptedData, iv)

        // 查询当前登录用户是否创建，否则创建
        let user = await User.findOne({ where: { openId: openId } })
        if (!user) {
            let createUser = await User.create(decryptedUserInfo)
            if (createUser) {
                user = createUser.dataValues
            }
        }
        let sessionKeyRecord = await SessionKey.findOne({ where: { uid: user.id } })
        if (sessionKeyRecord) {
            await sessionKeyRecord.update({
                sessionKey: sessionKey
            })
        } else {
            let sessionKeyRecordCreateRes = await SessionKey.create({
                uid: user.id,
                sessionKey: sessionKey
            })
            sessionKeyRecord = sessionKeyRecordCreateRes.dataValues
        }

        let authorizationToken = jsonwebtoken.sign(
            {
                uid: user.id,
                nickName: decryptedUserInfo.nickName,
                avatarUrl: decryptedUserInfo.avatarUrl,
                openId,
                sessionKey
            },
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