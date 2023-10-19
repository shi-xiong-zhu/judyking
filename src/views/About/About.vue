<template>
    <div>
        <van-nav-bar fixed title="关于我们" left-arrow @click-left="$router.back()">
            <template #right>
                <van-icon name="ellipsis" size="18" />
            </template>
        </van-nav-bar>
        <header>关于我们</header>
        <div class="mainBody">
            newbee-mall项目是一套电商系统,包括newbee-mall商城系统及newbee-mal-admin商城后台管理系统,基于SpringBoot2.X及相关技术栈开发。前台商城系统包含首页门户、商品分类、新品上线、首页轮播、商品推荐、商品搜索、商品展示、购物车、订单结算、订单流程、个人订单管理、会员中心、帮助中心等模块。后台管理系统包含数据面板、轮播图管理、商品管理、订单管理、会员管理、分类管理、设置等模块。
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    components: {},
    data() {
        return {};
    },
    // beforeRouteEnter(to, from, next) {
    //     console.log("----beforeRouteEnter-------");
    //     console.log(to);
    //     console.log(from);
    //     console.log("-----------");
    //     next()
    // },
    // beforeRouteLeave(to, from, next) {
    //     console.log("----beforeRouteLeave -------");
    //     console.log(to);
    //     console.log(from);
    //     console.log("-----------");
    //     next()
    // },
    methods: {}
};
</script>

<style scoped>
header {
    margin-top: 50px;
    text-align: center;
    font-size: 20px;
    color: aqua;
}

.mainBody {
    text-indent: 2em;
    font-size: 20px;
    margin: 0 10px;
    text-align: justify;
}
</style>