const Router = require("koa-router")

// prefix：设置路由前缀
const router = new Router({ prefix: "/goods" })

const { categories, goods } = require("../controllers/goods")

router.get("/categories", categories)
router.get("/goods", goods)


module.exports = router