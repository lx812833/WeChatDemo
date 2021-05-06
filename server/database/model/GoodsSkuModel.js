const { Sequelize, Model } = require("sequelize")
const { sequelize } = require("../init")

class GoodsSkuModel extends Model {

}

module.exports = GoodsSkuModel.init({
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    goods_id: {
        type: Sequelize.INTEGER(20),
        allowNull: false
    },
    goods_attr_path: {
        type: Sequelize.JSON,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: "GoodsSkuModel",
    timestamps: true
})