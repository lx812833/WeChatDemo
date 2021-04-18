const jsonwebtoken = require("jsonwebtoken")
const WeixinAuth = require("../libs/WeixinAuth")
const WXBizDataCrypt = require('../libs/WXBizDataCrypt')

const { jwtSecret, minProgram } = require("../config")
const User = require("../database/model/User")

class UserControl {
    /**
     * 用户登录
     * @param {*} ctx 
     */
    async login(ctx) {
        const { code, encryptedData, iv, sessionKeyIsValid } = ctx.request.body
        const weixinAuth = new WeixinAuth(minProgram.appId, minProgram.appSecret)
        const token = await weixinAuth.getAccessToken(code)
        const sessionKey = token.data.session_key
        const pc = new WXBizDataCrypt(minProgram.appId, sessionKey)

        let decryptedUserInfo = pc.decryptData(encryptedData, iv)

        let authorizationToken = jsonwebtoken.sign(
            { name: decryptedUserInfo.nickName },
            jwtSecret,
            { expiresIn: '1d' }
        )
        Object.assign(decryptedUserInfo, { authorizationToken })
        console.log("decryptedUserInfo", decryptedUserInfo, decryptedUserInfo.openId)

        // 查询当前登录用户是否创建，否则创建
        // let user = await User.findOne({ where: { openId: decryptedUserInfo.openId } })
        // console.log("user", user)
        // if (!user) {
        //     let createUser = await User.create(decryptedUserInfo)
        //     console.log("createRes", createUser)
        //     if (createUser) {
        //         user = createUser.dataValues
        //     }
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