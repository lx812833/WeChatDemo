const GoodsCategory = require("../database/model/GoodsCategory")
const Goods = require("../database/model/Goods")

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

    /**
     * 获取商品列表
     * @param {*} ctx 
     */
    async goods(ctx) {
        let whereObj = {}
        let page_size = 20
        let page_index = 1
        if (ctx?.query?.page_size) {
            page_size = Number(ctx.query.page_size)
        }
        if (ctx?.query?.page_index) {
            page_index = Number(ctx.query.page_index)
        }
        if (ctx?.query?.category_id) {
            whereObj['category_id'] = Number(ctx.query.category_id)
        }

        let goods = await Goods.findAll({
            where: whereObj,
            order: [
                ['id', 'desc'] // 排序 desc 倒序排序
            ],
            limit: page_size,
            offset: (page_index - 1) * page_size // 偏移量
        })

        ctx.status = 200
        ctx.body = {
            code: 200,
            msg: 'ok',
            data: goods
        }
    }
}

module.exports = new GoodsControl()