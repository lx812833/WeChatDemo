const GoodsCategory = require("../database/model/GoodsCategory")

class GoodsControl {
    /**
     * 获取商品分类列表
     * @param {*} ctx 
     */
    async categories(ctx) {
        let categories = await GoodsCategory.findAll({
            attributes: ["id", "category_name"] // 设置只返回字段
        })
        ctx.status = 200
        ctx.body = {
            code: 200,
            msg: 'ok',
            data: categories
        }
    }
}

module.exports = new GoodsControl()