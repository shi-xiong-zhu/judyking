<template>
    <div>
        <van-nav-bar title="生成订单" left-arrow @click-left='$router.back()' fixed>
            <template #right>
                <van-icon name="ellipsis" />
            </template>
        </van-nav-bar>
        <van-address-list :list="Address" @click-item="backAddressList" />
        <van-icon name="arrow" />
        <van-swipe-cell v-for='item in orderGoods' :key='item.goodsId'>
            <van-card :num="item.goodsCount" :price="item.sellingPrice" desc="描述信息" :title="item.goodsName"
                class="goods-card" :thumb="item.goodsCoverImg" />
        </van-swipe-cell>
        <van-submit-bar button-color="#08d9d6" v-show="totalMoney" :price="totalMoney" button-text="生成订单"
            @submit="onsubmit">
        </van-submit-bar>
        <van-action-sheet :close-on-click-overlay="false" :round="false" v-model="show" :actions="actions"
            cancel-text="取消" @cancel="onCancel" @select="onSelect" />
    </div>
</template>

<script>
import { getAddressDetail, orderGoodsList, saveOrder, zfbpay, wxpay } from "../../api/index"
export default {
    name: 'App',
    created() {
        //进来就获取购物车的数据
        this.$store.dispatch("changeCartListAsync");
        //订单内商品
        this.orderGood();
        //拿地址
        this.getData();

    },
    components: {
    },
    data() {
        return {
            orderGoods: [], //订单商品
            Address: [],  //订单地址
            show: false,
            actions: [{ name: '支付宝付款' }, { name: '微信付款' }],
            orderNumber: "",
        }
    },
    computed: {
        //通过计算属性拿到Vuex state
        list: {
            get() {
                return this.$store.state.cartList;
            },
        },
        totalMoney() {
            return this.orderGoods.reduce((prev, cur) => {
                return (
                    prev + (cur.goodsCount * cur.sellingPrice * 100)
                );
            }, 0);
        },
    },
    methods: {
        //支付方式
        onSelect(item) {
            console.log(item)
            if (item.name === "支付宝付款") {
                zfbpay(this.orderNumber, 1).then(data => {
                    console.log(data);
                })
                this.$router.replace({
                path: '/order', query: {
                    orderNumber: this.orderNumber
                }
            })

            }
            if (item.name === "微信付款") {
                wxpay(this.orderNumber, 2).then(data => {
                    console.log(data);
                })
                this.$router.replace({
                path: '/order', query: {
                    orderNumber: this.orderNumber
                }
            })

            }
        },
        //生成订单
        onsubmit() {
            this.show = true
            // 发请求获得订单编号
            saveOrder(this.$route.query.addressId, this.$route.query.cartItemIds).then((data) => {
                this.orderNumber = data.data
                console.log(this.orderNumber);
            })
            sessionStorage.removeItem("ids")
        },
        //取消支付
        onCancel() {
            this.$router.replace({
                path: '/order', query: {
                    orderNumber: this.orderNumber
                }
            })
        },
        //订单内商品
        orderGood() {
            orderGoodsList(this.$route.query.cartItemIds).then((data) => {
                console.log(data.data);
                this.orderGoods = data.data
                console.log(this.orderGoods);
            })
        },
        //返回到地址列表
        backAddressList() {
            this.$router.replace({
                path: "/addressList",
                query: {
                    cartItemIds: this.$route.query.cartItemIds
                }
            })
        },
        //获得选中的地址去生成订单
        getData() {
            getAddressDetail(this.$route.query.addressId).then((data) => {
                let { addressId, userName, userPhone, provinceName, cityName, regionName, detailAddress, defaultFlag } = data.data

                let AddressData = {
                    id: addressId,
                    name: userName,
                    tel: userPhone,
                    address:
                        provinceName +
                        cityName +
                        regionName +
                        detailAddress,
                    isDefault: defaultFlag,
                }
                this.Address.push(AddressData)
            });
        }
    }
}
</script>

<style scoped lang="less">
/deep/.van-address-list {
    margin-top: 1.6rem;
    padding-bottom: .5333rem;
}

/deep/.van-address-list__bottom {
    display: none;
}

/deep/.van-icon-success,
.van-icon-edit {
    display: none;
}

.van-icon-arrow {
    position: absolute;
    bottom: 14.6rem;
    right: .2rem;
    color: #08d9d6;
}

/deep/.van-button {
    background-color: #08d9d6;
}
</style>