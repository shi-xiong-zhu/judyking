import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () =>
            import ( /*webpackChunkName:"home" */ '../views/Home/Home.vue'),
        meta: {
            index: 1,
            isShowNav: true
        }
    },
    {
        path: '/category',
        component: () =>
            import ( /*webpackChunkName:"category" */ '../views/Category/Category.vue'),
        meta: {
            index: 1 ,
            isShowNav: true
        }
    },
    {
        path: '/cart',
        component: () =>
            import ( /*webpackChunkName:"cart" */ '../views/Cart/Cart.vue'),
        meta: {
            index: 1,
            isShowNav: true
        }
    },
    {
        path: '/user',
        component: () =>
            import ( /*webpackChunkName:"user" */ '../views/User/User.vue'),
        meta: {
            index: 1,
            isShowNav: true
        }
    },
    {
        path: '/login',
        component: () =>
            import ( /*webpackChunkName:"login" */ '../views/Login/Login.vue'),
        meta: {
            index: 1,
            isShowNav: false
        }
    },
    {
        //动态路由参数productId会被$route.params.productId得到
        path: '/info/:productId',
        component: () =>
            import ( /*webpackChunkName:"info" */ '../views/Info/Info.vue'),
        meta: {
            isShowNav: false // 控制的是是否展示下边的导航栏
        }
    },
    {
        path: '/addressList',
        component: () =>
            import ( /*webpackChunkName:"AddressList" */ '../views/Address/AddressList.vue'),
        meta: {
            index: 2,
            isShowNav: false // 控制的是是否展示下边的导航栏
        }
    },
    {
        path: '/addressEdit',
        component: () =>
            import ( /*webpackChunkName:"AddressEdit" */ '../views/Address/AddressEdit.vue'),
        meta: {
            index: 3,
            isShowNav: false // 控制的是是否展示下边的导航栏
        }
    },

    {
        path: '/create-order',
        component: () =>
            import ( /*webpackChunkName:"AddressEdit" */ '../views/CreateOrder/CreateOrder.vue'),
        meta: {
            index: 3,
            isShowNav: false // 控制的是是否展示下边的导航栏
        }
    },
    {
        path: '/order',
        component: () =>
            import ( /*webpackChunkName:"Order" */ '../views/Order/Order.vue'),
        meta: {
            index: 2,
            isShowNav: false, //订单页
            til: "订单页"
        }
    },
    {
        path: "/order-detail",
        component: () =>
            import ( /*webpackChunkName:"order-detail" */ '../views/Info/OrderInfo.vue'),
        meta: {
            index: 3,
            isShowNav: false, // 订单详情
            til: "订单详情"
        }
    },
    {
        path: "/product-list",
        component: () =>
            import ( /*webpackChunkName:"product-list" */ '../views/Search/Search.vue'),
        meta: {
            index: 3,
            isShowNav: false,
            til: "搜索"
        }
    },
    {
        path: "/userInfo",
        component: () =>
            import ( /*webpackChunkName:"userInfo" */ '../views/User/UserInfo.vue'),
        meta: {
            index: 3,
            isShowNav: false,
            til: "账号管理"
        }
    },
    {
        path: "/about",
        component: () =>
            import ( /*webpackChunkName:"OrderInfo" */ '../views/About/About.vue'),
        meta: {
            index: 3,
            isShowNav: false,
            til: "关于我们"
        },
        beforeEnter: (to, from, next) => {
            console.log("------beforeEnter-----");
            console.log(to);
            console.log(from);
            console.log("-----------");
            next()
        }
    },
]

const router = new VueRouter({
    routes
})

//网站标题的显示
// router.beforeEach((to, from, next) => {
//     console.log("------beforeEach-----");
//     console.log(to);
//     console.log(from);
//     console.log("-----------");
//     document.title = to.meta.til || "新蜂商城"
//     next()
// })

router.afterEach((to, from) => {
    document.title = to.meta.til || "新蜂商城"
})

export default router