const { Sequelize, Model } = require("sequelize")
const { sequelize } = require("../init")

// 商品规格（颜色，尺码）
class GoodsAttrKey extends Model {

}

module.exports = GoodsAttrKey.init({
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
    attr_key: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    tableName: "GoodsAttrKey",
    timestamps: true
})