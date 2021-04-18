const jsonwebtoken = require("jsonwebtoken")
const { Sequelize } = require("sequelize")

const config = {
    jwtSecret: "jwtSecret",
    minProgram: {
        appId: "wx945d022da1eeff40",
        appSecret: "a9a57c910b7a451f247fbfdc5b10f83a"
    },
    auth: async function (ctx, next) {
        let { token = "" } = ctx.request.header
        token = token.replace("Bearer ", "")
        try {
            const user = jsonwebtoken.verify(token, "jwtSecret")
            ctx.state.user = user
        } catch (error) {
            ctx.throw(401, error.message)
        }
        await next()
    },
    MySQLConfig: {
        environment: "dev",
        database: "vantmall",
        username: "root",
        password: "lx812833",
        host: "localhost", // 主机名
        port: 3306, // 端口号
        define: {
            freezeTableName: true, // 是否冻结表名, 默认表名会转换为复数形式
            // 是否为表添加 createdAt 和 updatedAt 字段
            createdAt: true, // 记录表的创建时间
            // updatedAt 记录字段更新时间
            timestamps: true,
            // 是否为表添加 deletedAt 字段
            // 默认情况下, destroy() 方法会删除数据，设置 paranoid 为 true 时，将会更新 deletedAt 字段，并不会真实删除数据。
            paranoid: false
        },
        dialect: "mysql"
    }
}

module.exports = config