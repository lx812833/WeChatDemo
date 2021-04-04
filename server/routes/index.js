const fs = require("fs")

module.exports = res => {
    // 批量注册路由
    fs.readdirSync(__dirname).forEach(file => {
        if (file === "index.js") return
        const route = require(`./${file}`)
        // allowedMethods  响应option
        res.use(route.routes()).use(route.allowedMethods())
    })
}