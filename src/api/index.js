import http from "./http.js"
//加密
import md5 from "js-md5"

//注册接口
export function register(name, psw) {
    return http.post("/user/register", {
        loginName: name,
        password: psw
    })
}
//登陆接口
export function login(name, psw) {
    return http.post("/user/login", {
        loginName: name,
        passwordMd5: md5(psw)
    })
}
//首页信息
export function getIndexInfo() {
    return http.get("/index-infos")
}
//根据商品ID获取详情
export function getInfoData(id) {
    return http.get('/goods/detail/' + id)
}

//添加购物车
export function addCart(options) {
    return http.post('/shop-cart', options)
}

//获取购物车列表
export function getCartList() {
    return http.get("/shop-cart")
}
//改变商品个数
export function addGoods(cartItemId, goodsCount) {
    return http.put("/shop-cart", {
        cartItemId,
        goodsCount
    })
}

//删除购物车列表
export function deleteCartList(val) {
    return http.delete('/shop-cart/' + val)
}

// ================= 获取地址列表
export function getAddressList() {
    return http.get('/address')
}

// ================= 根据ID获取单个地址实现回显
export function getAddressDetail(id) {
    return http.get('/address/' + id)
}

// ================= 修改地址
export function updateAddress(obj) {
    return http.put('/address', obj)
}

// ================= 添加地址
export function addAddress(obj) {
    return http.post('/address', obj)
}

// ================= 删除地址
export function deleteAddress(id) {
    return http.delete('/address/' + id)
}
// ================= 获取订单列表
export function getOrderList(p, s) {
    // ?pageNumber=1&status=
    return http.get('/order', {
        params: {
            pageNumber: p,
            status: s
        }
    })
}

//生成订单时拿商品数据
export function orderGoodsList(obj) {
    return http.get('/shop-cart/settle?cartItemIds=' + obj)
}

//保存订单
export function saveOrder(id, ids) {
    return http.post('/saveOrder', {
        addressId: id,
        cartItemIds: ids
    })
}
//支付宝支付
export function zfbpay(id, pay) {
    return http.get('/paySuccess?' + "orderNo=" + id + "&payType=" + pay)
}

//微信支付
export function wxpay(id, pay) {
    return http.get('/paySuccess?' + "orderNo=" + id + "&payType=" + pay)
}

// ================= 获取用户信息
export function getUserInfo() {
    return http.get('/user/info')
}

// ================= 获取订单详情
export function orderDetails(id) {
    return http.get('/order/' + id)
}

//=========确认收货
export function confirmReceipt(id) {
    return http.put('/order/' + id + "/finish")
}

//=========取消订单
export function cancelOrder(id) {
    return http.put('/order/' + id + "/cancel")
}

//=========商品分类的数据
export function goodsCategory() {
    return http.get('/categories')
}

//=========搜索页
export function SearchFromhome(pageNumber, keyword, orderBy) {
    return http.get('/search?pageNumber=' + pageNumber + '&keyword=' + keyword + '&orderBy=' + orderBy)
}

//=========分类的三级分类到搜索页
export function categoryGohome(pageNumber, goodsCategoryId, keyword, orderBy) {
    return http.get('/search?pageNumber=' + pageNumber + "&goodsCategoryId=" + goodsCategoryId + '&keyword=' + keyword + '&orderBy=' + orderBy)
}

//=========账号管理
export function userInfo() {
    return http.get('/user/info')
}

//=========账号管理  保存
export function saveAccount(a, b, c) {
    return http.put('/user/info', { introduceSign: a, nickName: b, passwordMd5: md5(c) })
}

//=========退出登陆
export function quitAccount(a, b, c) {
    return http.get('index-infos')
}