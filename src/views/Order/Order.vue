<template>
    <div class="order-box">
        <van-nav-bar fixed title="我的订单" left-arrow @click-left="$router.back()">
            <template #right>
                <van-icon name="ellipsis" size="18" />
            </template>
        </van-nav-bar>

        <van-tabs v-model="index">
            <van-tab v-for="item in tabs" :key="item.text" :title="item.text">
            </van-tab>
        </van-tabs>

        <div>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                :immediate-check="false">
                <van-cell v-for="item in list" :key="item.orderId" @click="jump(item.orderNo)">
                    <template #default>
                        <div>
                            <p>
                                订单时间：{{  item.createTime  }} ----
                                {{  item.orderStatusString  }}
                            </p>
                            <div v-for="v in item.newBeeMallOrderItemVOS" :key="v.goodsId">
                                <img style="width: 180px" :src="v.goodsCoverImg" alt="" />
                                <p>名称：{{  v.goodsName  }}</p>
                                <p>单价：{{  v.sellingPrice  }}</p>
                            </div>
                            <p style="color:red; font-size:.5rem" >总价格：{{  item.totalPrice  }}</p>
                        </div>
                    </template>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>
  
  <script>
import { getOrderList } from "../../api/index.js";
export default {
    name: "Order",
    mounted() {

    },
    data() {
        return {
            tabs: [
                {
                    text: "全部",
                    status: "",
                },
                {
                    text: "待付款",
                    status: "0",
                },
                {
                    text: "待确认",
                    status: "1",
                },

                {
                    text: "代发货",
                    status: "2",
                },
                {
                    text: "已发货",
                    status: "3",
                },
                {
                    text: "交易完成",
                    status: "4",
                },
            ],
            list: [],
            loading: false,
            finished: false,
            pageNumber: 1,
            status: "",
            index: 0,
        };
    },
    created() {
        this.onLoad();
    },
    methods: {
        //跳到详情页
        jump(val) {
            // this.$router.push({path:'/order-detail',query:{
            //      id:this.list.item.orderId
            // }})
            this.$router.push({
                path: '/order-detail', query: {
                    orderNumber:val
                }
            })

        },
        //触底事件
        onLoad() {
            // console.log("load事件触发了....");
            getOrderList(this.pageNumber++, this.status).then((data) => {
                if (data.data.list.length == 0) {
                    this.finished = true;
                }
                this.list = this.list.concat(data.data.list);
                this.loading = false;
            });
        },
    },
    watch: {
        index(val) {
            console.log(val);
            // console.log(this.tabs[val].status);
            this.status = this.tabs[val].status;
            // 在发送ajax之前，需要把pageNumber变成1
            this.pageNumber = 1;
            // 把list清空
            this.list = [];
            // 切换新的tab之后，finished要设置成false，因为之前有可能变成了true
            this.finished = false;
            this.onLoad();
        }
    }
};
</script>

<style scoped lang="less">
.van-tabs {
    margin-top: 1rem;
    position: fixed;
    left: 0;
    z-index: 1000;
    width: 100%;
}

/deep/.van-list {
    padding-top: 2rem;
}

/deep/.van-tabs__line {
    background-color: #08d9d6;
}
</style>