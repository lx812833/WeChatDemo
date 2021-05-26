const Router = require("koa-router")

// prefix：设置路由前缀
const router = new Router({ prefix: "/goods" })

const { categories, goods, detail } = require("../controllers/goods")

router.get("/categories", categories)
router.get("/goods", goods)
router.get("/goods/:id", detail)


module.exports = router