<template>
    <div>
        <van-nav-bar title="商品详情" left-arrow @click-left="$router.back()" fixed>
            <template #right>
                <van-icon name="ellipsis" />
            </template>
        </van-nav-bar>
        <div class="goodsDisc">
            <img style="width: 100%" :src="info.goodsCoverImg" alt="" />
            <h3>
                {{ info.goodsName }}
            </h3>
            <p>{{ info.goodsIntro }}</p>
            <span>原始价格{{ info.originalPrice }};现价{{ info.sellingPrice }}</span>
            <!-- 解析HTML字符串 -->
            <div v-html="info.goodsDetailContent"></div>
        </div>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="cart-o" text="购物车" @click="goodsCart" />
            <van-badge color="#08d9d6" :content="$store.getters.cartNum" v-show="$store.getters.cartNum" />
            <van-goods-action-button color="#0dc3c3" type="warning" text="加入购物车" @click="add()" />
            <van-goods-action-button color="#098888" type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>

<script>
import { getInfoData, addCart } from "../../api/index";
import { Toast } from 'vant';
export default {
    name: "Info",
    created() {
        this.getData();
        this.$store.dispatch("changeCartListAsync"); //进来就获取购物车的数据
        console.log(this.info);
    },
    data() {
        return {
            info: {},
            flag: true,
        };
    },
    methods: {
        //跳转到购物车
        goodsCart() {
            this.$router.push("/cart", { params: { info: this.info } })
        },
        //发请求拿商品详情
        getData() {
            getInfoData(this.$route.params.productId).then((data) => {
                // console.log(data);
                this.info = data.data;
            })
        },
        //添加到购物车
        add() {
            if (!this.flag) return;
            this.flag = false;
            addCart({
                goodsId: this.$route?.params?.productId,
                goodsCount: 1,
            }).then((data) => {
                // this.flag = true;
                if (data.resultCode == 200) {
                    this.flag = true;
                    Toast.success("添加成功");
                    //dispatch一个actions
                    this.$store.dispatch("changeCartListAsync");
                } else {
                    Toast.fail("商品已存在");
                }
            });

        }
    },
};
</script>

<style lang="less" scoped>
/deep/.van-goods-action-icon {
    position: relative;
}
.van-badge {
    position: absolute;
    top: 0;
    left: 2rem;
}
.goodsDisc {
    margin-top: 1.3333rem;

    h3 {
        font-size: .48rem;
        text-align: left;
        color: #333;
        text-align: justify
    }
    p {
        font-size: .37333rem;
        text-align: left;
        color: #999;
        padding: .13333rem 0;
    }
    span {
        color: #f63515;
        font-size: .58667rem;
        font-size: .32rem;
    }
}
</style>