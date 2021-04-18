const { Sequelize, Model } = require("sequelize")
const { sequelize } = require("../init");

class SessionKey extends Model {

}

module.exports = SessionKey.init({
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }
}, {
    sequelize,
    tableName: 'SessionKey'
})