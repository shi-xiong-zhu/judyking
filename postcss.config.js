// postcss.config.js
module.exports = {
    plugins: {
        'postcss-pxtorem': {
            // 一个元素是75px   ===>   2rem 
            rootValue: 37.5,
            propList: ['*'],
        },
    },
};