const { Sequelize, Model } = require("sequelize")
const { sequelize } = require("../init")
const User = require("./User")

class SessionKey extends Model {

}

module.exports = SessionKey.init({
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false, // 允许为空
        primaryKey: true, // 主键
        autoIncrement: true, // 自增
    },
    uid: {
        type: Sequelize.INTEGER(11),
        references: {
            model: User,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
        allowNull: false
    },
    sessionKey: {
        type: Sequelize.STRING(24),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'SessionKey',
    timestamps: true // 表示数据库中是否会自动更新createdAt和updatedAt字段
})