<template>
  <div>
    <van-nav-bar fixed title="订单详情" left-arrow @click-left="$router.back()">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <div class="orderDetail">
      <div class="Detail">
        <p>订单状态：{{ orderDetail.orderStatusString }}</p>
        <p>订单编号：{{ orderDetail.orderNo }}</p>
        <p>下单时间：{{ orderDetail.createTime }}</p>
        <br>
        <div v-show="isOk">
          <van-button color="#08d9d6" @click="handlerOrder(payState)">{{ payState }}</van-button>
          <van-button @click="handlreCancel">取消订单</van-button>
        </div>
      </div>
      <div class="disc">
        <p>商品金额：￥{{ orderDetail.totalPrice }}</p>
        <p>配送方式：普通快递</p>
      </div>
    </div>
    <van-swipe-cell v-for='item in orderDetail.newBeeMallOrderItemVOS' :key='item.goodsId'>
      <van-card :num="item.goodsCount" :price="item.sellingPrice" desc="描述信息" :title="item.goodsName" class="goods-card"
        :thumb="item.goodsCoverImg" />
    </van-swipe-cell>

    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import { orderDetails, confirmReceipt, zfbpay, wxpay, cancelOrder } from "../../api/index.js";
export default {
  name: 'Orderinfo',
  mounted() {
    orderDetails(this.$route.query.orderNumber).then((data) => {
      console.log(data.data)
      this.orderDetail = data.data
      this.orderNumber = this.$route.query.orderNumber
      if (data.data.orderStatusString == "交易成功" || data.data.orderStatusString == "手动关闭") {
        this.isOk = false;
      }
    })
  },
  components: {
  },
  data() {
    return {
      show: false,
      actions: [{ name: '支付宝付款' }, { name: '微信付款' }],
      orderNumber: "",//订单号
      orderDetail: [],//订单详情
      isOk: true,
    }
  },
  methods: {
    //取消订单 
    handlreCancel() {
      cancelOrder(this.$route.query.orderNumber).then((data) => {
        console.log(data);
        orderDetails(this.$route.query.orderNumber).then((data) => {
          this.orderDetail = data.data
        })
      })
    },
    //去支付
    onSelect(item) {
      console.log(item)
      if (item.name === "支付宝付款") {
        zfbpay(this.orderNumber, 1).then(data => {
          this.show = false;
          //支付后订单详情
          orderDetails(this.$route.query.orderNumber).then((data) => {
            this.orderDetail = data.data

          })
        })
      }
      if (item.name === "微信付款") {
        wxpay(this.orderNumber, 2).then(data => {
          console.log(data);
          this.show = false;
          //支付后订单详情
          orderDetails(this.$route.query.orderNumber).then((data) => {
            this.orderDetail = data.data

          })
        })
      }
    },
    handlerOrder(val) {
      if (val === "去支付") {
        this.show = true;
      } else if (val === "确认收货") {
        confirmReceipt(this.$route.query.orderNumber).then((data) => {
          console.log(data)
        })
        //收货后订单详情
        orderDetails(this.$route.query.orderNumber).then((data) => {
          // console.log(data.data)
          this.orderDetail = data.data
          this.isOk = false;

          // this.orderNumber = this.$route.query.orderNumber
        })
      } else {
        return
      }
    }
  },
  computed: {
    payState() {
      return this.orderDetail.orderStatusString == "待支付" ? "去支付" : "确认收货"
    }
  }
}
</script>

<style scoped lang="less">
.orderDetail {
  margin-top: 1.8rem;
  font-size: .4rem;
  margin-left: .8rem;

  .disc {
    margin-top: 1rem;
  }
}

/deep/.van-button {
  width: 90%;
  margin: 0 auto;
}
</style>