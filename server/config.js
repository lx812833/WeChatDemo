const jsonwebtoken = require("jsonwebtoken")

const config = {
    jwtSecret: "jwtSecret",
    minProgram: {
        appId: "wx945d022da1eeff40",
        appSecret: "a9a57c910b7a451f247fbfdc5b10f83a"
    },
    auth: async function (ctx, next) {
        let { token = "" } = ctx.request.header
        token = token.replace("Bearer ", "")
        try {
            const user = jsonwebtoken.verify(token, "jwtSecret")
            ctx.state.user = user
        } catch (error) {
            ctx.throw(401, error.message)
        }
        await next()
    }
}

module.exports = config