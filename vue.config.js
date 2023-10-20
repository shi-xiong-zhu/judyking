const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: "/xfshop/dist",
    devServer: {
        // proxy:"http://backend-api-01.newbee.ltd"
        proxy: {
            '/api': {
                //目标服务器
                target: "http://backend-api-01.newbee.ltd"
            }
        }
    }
})