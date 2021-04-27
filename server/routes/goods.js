const Router = require("koa-router")

// prefix：设置路由前缀
const router = new Router({ prefix: "/goods" })

const { categories } = require("../controllers/goods")

router.get("/categories", categories)

module.exports = router