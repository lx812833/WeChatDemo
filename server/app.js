const koa = require("koa")
const logger = require("koa-logger")
const moment = require("moment")

const app = new koa()
app.use(logger())

app.use(async (ctx) => {
    ctx.body = `<h1>hello node</h1>`
})

// 打印请求日志
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`执行时间：${ctx.method} ${ctx.url} - ${rt}`);
});

app.listen(3000, () => {
    console.log(`[Server] starting at port 3000`)
})