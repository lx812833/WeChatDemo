const { Sequelize, Model } = require("sequelize")
const { sequelize } = require("../init")

// 品牌表
class Brand extends Model {

}

module.exports = Brand.init({
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false, // 允许为空
        primaryKey: true, // 主键
        autoIncrement: true, // 自增
    },
    brand_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    tableName: "Brand",
    timestamps: true
})