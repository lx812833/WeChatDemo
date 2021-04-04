class HomeControl {
    // 首頁
    async homeIndex(ctx) {
        ctx.body = {
            code: 200,
            data: {
                message: "获取成功！",
            }
        }
    }

    // hi
    async hi(ctx) {
        ctx.body = {
            code: 200,
            data: {
                message: "获取成功！",
            }
        }
    }
}

module.exports = new HomeControl()