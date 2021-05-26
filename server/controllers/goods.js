const GoodsCategory = require("../database/model/GoodsCategory")
const Goods = require("../database/model/Goods")
const GoodsInfo = require("../database/model/GoodsInfo")

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

        // 关联GoodsInfo查询（一对多）
        Goods.hasMany(GoodsInfo, { foreignKey: 'goods_id', targetKey: 'id' })

        let goods = await Goods.findAndCountAll({
            where: whereObj,
            order: [
                ['id', 'desc'] // 排序 desc 倒序排序
            ],
            limit: page_size, // 前端分页组件传来的一页显示多少条
            offset: (page_index - 1) * page_size, // 前端分页组件传来的起始偏移量
            include: [{ // 关联查询
                model: GoodsInfo, // 指定关联GoodsInfo表
                attributes: ['content', 'kind', 'goods_id'], // 查询GoodsInfo表的content、kind，goods_id字段
                // where: { 'kind': 0 }
            }],
            distinct: true
        })

        ctx.status = 200
        ctx.body = {
            code: 200,
            msg: 'ok',
            data: goods
        }
    }

    /**
     * 获取商品详情
     * @param {*} ctx
     */
    async detail(ctx) {
        let goodsId = Number(ctx.params.id)
        Goods.hasMany(GoodsInfo, { foreignKey: 'goods_id', targetKey: 'id' })
        let goods = await Goods.findOne({
            where: {
                id: goodsId
            },
            include: [{
                model: GoodsInfo,
                attributes: ['content', 'kind', 'goods_id']
            }]
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