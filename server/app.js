const koa = require("koa")
const logger = require("koa-logger")
const session = require("koa-session")
const store = require("koa-session-local")
const koaBody = require("koa-body")
const jsonwebtoken = require("jsonwebtoken")
const koajwt = require("koa-jwt")
const { jwtSecret } = require("./config")

const app = new koa()

// 导入路由
const router = require("./routes")

// 连接数据库
const { connect, initModels } = require("./database/init");
; (async () => {
    await connect()
    initModels()
})()

app.use(logger())
app.use(koaBody())

// 打印请求日志
app.use(async (ctx, next) => {
    await next()
    const rt = ctx.response.get("X-Response-Time")
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set("X-Response-Time", `${ms}ms`)
})

// 设置签名的 Cookie 密钥
app.keys = ["koakeys"]
// signed = false 时，app.keys 不赋值没有关系；
// 如果 signed: true 时，则需要对 app.keys 赋值，否则会报错。

const CONFIG = {
    store: new store(), //  将session存储到服务器端的内存里
    key: "koa.sess",    //  cookie的key。 (默认是 koa:sess) 
    maxAge: 86400000,   //  cookie有效时长
    autoCommit: true,   //  自动提交到响应头。(默认是 true)
    overwrite: true,    //  是否允许重写。(默认是 true)
    httpOnly: true,     //  是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true)
    signed: true,       //  是否签名。(默认是 true)
    rolling: false,     //  是否每次响应时刷新Session的有效期。(默认是 false)
    renew: false,       //  是否在Session快过期时刷新Session的有效期。(默认是 false)
    secure: false,
    sameSite: null,
};
// Error: Cannot send secure cookie over unencrypted connection
// 将 secure 改为false，在本地测试
app.use(session(CONFIG, app))

// cookie
// app.use(async function (ctx, next) {
//     const n = ~~ctx.cookies.get("view") + 1
//     // cookie中设置了HttpOnly属性,那么通过js脚本将无法读取到cookie信息
//     ctx.cookies.set("view", n, { httpOnly: false })
//     await next()
// })

// session
// app.use(async (ctx) => {
//     let n = ~~ctx.session.views;
//     ctx.session.views = n;
//     ctx.body = 'views' + n;
// })

// 路由 批量读取并注册
router(app)

// 路由鉴权 以及验证token是否有效
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        if (error.status === 401) {
            ctx.status = 401
            ctx.body = "Protected resource"
        } else {
            throw error
        }
    }
})

// 若验证未通过，则404
app.use(koajwt({ secret: jwtSecret }).unless({
    path: ['/users/login']
}))

app.listen(3000, () => {
    console.log(`[Server] starting at port 3000`)
})