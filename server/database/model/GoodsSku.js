const { Sequelize, Model } = require("sequelize")
const { sequelize } = require("../init")

// 商品sku
class GoodsSku extends Model {

}

module.exports = GoodsSku.init({
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
    goods_attr_path: {
        type: Sequelize.JSON,
        allowNull: false
    },
    // 商品价格（分）
    price: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    // 库存量
    stock: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: "GoodsSku",
    timestamps: true
})