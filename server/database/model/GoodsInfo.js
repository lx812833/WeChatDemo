const { Sequelize, Model } = require("sequelize")
const { sequelize } = require("../init")

// 商品描述
class GoodsInfo extends Model {

}

module.exports = GoodsInfo.init({
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false, // 允许为空
        primaryKey: true, // 主键
        autoIncrement: true, // 自增
    },
    // 商品id
    goods_id: {
        type: Sequelize.INTEGER(20),
        allowNull: false
    },
    // 内容类型
    kind: {
        type: Sequelize.INTEGER(4),
        allowNull: false
    },
    // 内容
    content: {
        type: Sequelize.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    tableName: "GoodsInfo",
    timestamps: true
})