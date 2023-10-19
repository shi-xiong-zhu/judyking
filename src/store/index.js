import Vue from 'vue'
import Vuex from 'vuex'
import { getCartList } from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //购物车内商品数据 
        cartList: []
    },
    mutations: {
        //给请求过来的数据添加一个是否选中的属性
        changeCartList(state, list) {
            state.cartList = list.map(item => {
                item.checked = true
                return item
            });
        }
    },
    actions: {
        //dispacth的action
        changeCartListAsync(store) {
            getCartList().then(data => {
                // 提交一个mutation
                store.commit('changeCartList', data.data || [])
            })
        }
    },
    getters: {
        // 算出来的就是购物车的数量
        cartNum(state) {
            // return state.cartList.reduce((prev, cur) => {
            //     return prev + cur.goodsCount
            // }, 0)
            //只显示商品种类个数
            return state.cartList.length
        }
    }
})