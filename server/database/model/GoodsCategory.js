const { Sequelize, Model } = require("sequelize")
const { sequelize } = require("../init")

class GoodsCategory extends Model {

}

module.exports = GoodsCategory.init({
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false, // 允许为空
        primaryKey: true, // 主键
        autoIncrement: true, // 自增
    },
    category_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'GoodsCategory',
    timestamps: true // 表示数据库中是否会自动更新createdAt和updatedAt字段
})