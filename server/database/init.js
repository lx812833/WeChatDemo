const Sequelize = require("sequelize")
const { MySQLConfig } = require("../config")

// 实例化 Sequelize
const sequelize = new Sequelize(MySQLConfig)

exports.sequelize = sequelize

/**
 * 允许使用 * 符号，来写一个glob规则
 * resolve：将一系列路径或路径段解析为绝对路径
 */
const { resolve } = require("path")
const glob = require("glob")

// 引入所有定义的model
exports.initModels = () => {
    glob.sync(resolve(__dirname, "./model/", "**/*.js")).forEach(require)
    
    // 同步数据库
    sequelize.sync({ alter: true })
}

// 连接数据库
exports.connect = () => {
    sequelize.authenticate().then(() => {
        console.log("连接成功")
    }).catch(err => {
        console.log("连接异常", err)
    })
}