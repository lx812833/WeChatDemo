const koa = require("koa")
const logger = require("koa-logger")
const koaBody = require("koa-body")
const middleware = require("./middleware/index")

const app = new koa()

// 注册中间件
middleware(app)

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

// 路由 批量读取并注册
router(app)

app.listen(3000, () => {
    console.log(`[Server] starting at port 3000`)
})