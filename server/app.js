const Koa = require("koa")

const app = new Koa()

app.use(async (ctx) => {
    ctx.body = `<h1>hello node</h1>`
})

app.listen(3000, () => {
    console.log(`[Server] starting at port 3000`)
})