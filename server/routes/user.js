const Router = require("koa-router")

// prefix：设置路由前缀
const router = new Router({ prefix: "/users" })

const { login } = require("../controllers/user")

router.post("/login", login)

module.exports = router