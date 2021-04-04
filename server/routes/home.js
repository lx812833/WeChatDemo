const Router = require("koa-router")

// prefix：设置路由前缀
const router = new Router({ prefix: "/" })

const { homeIndex, hi } = require("../controllers/home")

router.get("/", homeIndex)

router.get("hi", hi)

module.exports = router