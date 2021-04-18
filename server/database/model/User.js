const { Sequelize, Model } = require("sequelize")
const { sequelize } = require("../init");

class User extends Model {

}

module.exports = User.init({
    id: {
        type: Sequelize.INTEGER(11), // 整型
        allowNull: false,
        primaryKey: true,  // 设置主键
        autoIncrement: true, // 设置自增
    },
    nickName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    avatarUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.INTEGER
    },
    language: {
        type: Sequelize.STRING(10)
    },
    city2: {
        type: Sequelize.STRING(20)
    },
    province: {
        type: Sequelize.STRING(20)
    },
    country: {
        type: Sequelize.STRING(10)
    },
    openId: {
        type: Sequelize.STRING(32),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'User'
})