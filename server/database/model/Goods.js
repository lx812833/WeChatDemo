const { Sequelize, Model } = require("sequelize")
const { sequelize } = require("../init")

// 商品表
class Goods extends Model {

}

module.exports = Goods.init({
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false, // 允许为空
        primaryKey: true, // 主键
        autoIncrement: true, // 自增
    },
    // 商品编号
    spu_no: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    // 商品名称
    goods_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    goods_desc: {
        type: Sequelize.TEXT("tiny"),
        allowNull: false
    },
    start_price: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false
    },
    // 分类id
    category_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    // 品牌id
    brand_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    }
}, {
    sequelize,
    tableName: "Goods",
    timestamps: true
})