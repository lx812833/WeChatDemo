const { Sequelize, Model } = require("sequelize")
const { sequelize } = require("../init")

// 商品规格值
class GoodsAttrValue extends Model {

}

module.exports = GoodsAttrValue.init({
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
    attr_key_id: {
        type: Sequelize.INTEGER(20),
        allowNull: false
    },
    attr_value: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    tableName: "GoodsAttrValue",
    timestamps: true
})