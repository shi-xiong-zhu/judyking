import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入重置样式
import "./assets/reset.css"

// 引入flexible 适配
import "./assets/flexible.js"
//字体图标
import "./assets/fonts/iconfont.css"

//按需引入vant组件
import "./utils/vant"

Vue.config.productionTip = false
    //全局过滤器
Vue.filter("money", function(val) {
    return val.toFixed(2)
})


new Vue({
    router,
    store,
    beforeCreate() {
        // this表示vm
        // 配置全局事件总线,说白了，就是在Vue原型对象上添加$bus属性，值是vm
        // this是vm，不是vc
        // 在$bus身上有，$on和$emit  $on可以用来接收数据   $emit可以用来发送数据
        Vue.prototype.$bus = this;
    },
    render: h => h(App)
}).$mount('#app')