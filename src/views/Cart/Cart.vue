<template>
  <div>
    <!-- nav-bar -->
    <van-nav-bar title="购物车" left-arrow @click-left="$router.back()">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
    <div class="container">
      <!-- 加入购物车的商品 -->
      <van-swipe-cell v-for="item in list" :key="item.goodsId">
        <van-checkbox class="van-check" v-model="item.checked"></van-checkbox>
        <van-card
          :price="item.sellingPrice"
          desc="描述信息"
          :title="item.goodsName"
          class="goods-card"
          :thumb="item.goodsCoverImg"
        />
        <!-- <van-stepper
          v-model='item.goodsCount'
          @plus="add(item.cartItemId, item.goodsCount + 1)"
          @minus="del(item.cartItemId, item.goodsCount - 1)"
        /> -->

        <van-stepper
          :value="item.goodsCount"
          async-change
          @change="onChange($event, item.cartItemId)"
        />

        <template #right>
          <van-button
            square
            text="删除"
            class="delete-button"
            @click="deleteCartitem(item.cartItemId)"
          />
        </template>
      </van-swipe-cell>
    </div>
    <div class="empty" v-show="!list.length" @click="goHome()">
      <i class="van-icon van-icon-smile-o"></i>
      <div class="title">购物车空空空如也</div>
      <button
        class="van-button van-button--primary van-button--normal van-button--block"
        style="
          color: rgb(255, 255, 255);
          background: rgb(27, 174, 174);
          border-color: rgb(27, 174, 174);
        "
      >
        <span class="van-button__text">前往首页</span>
      </button>
    </div>

    <!-- submit-bar -->
    <van-submit-bar
      v-show="list.length"
      :price="totalMoney"
      button-text="提交订单"
      @submit="onsubmit"
    >
      <van-checkbox v-model="checkAll">全选</van-checkbox>
      <template #tip>
        <!-- 你的收货地址不支持同城送, <span>修改地址</span> -->
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { Toast } from "vant";
import { changeGoods, deleteGoods } from "../../api/index";
export default {
  name: "Cart",
  mounted() {
    //进来就获取购物车的数据
    this.$store.dispatch("changeCartListAsync");
  },
  data() {
    return {
      value: 1,
    };
  },
  methods: {
    goHome() {
      this.$router.push("/home");
      console.log(this);
    },
    //去选地址
    onsubmit() {
      let ids = [];
      this.list.forEach((item) => {
        if (item.checked == true) {
          ids.push(item.cartItemId);
        }
      });
      let idss = JSON.stringify(ids);
      sessionStorage.setItem("ids", idss);
      this.$router.push({
        path: "/addressList",
        // query: { cartItemIds: ids }
      });
    },
    //删除购物车的某一个商品
    deleteCartitem(val) {
      deleteCartList(val);
      this.$store.dispatch("changeCartListAsync");
    },

    // 改变商品数量
    async onChange(e, id) {
      Toast.loading({ forbidClick: true });

      try {
        const data = await changeGoods(id, e);
        console.log(data);
        if (data) {
          Toast.clear();
          this.$store.state.cartList.map((item) => {
            item.cartItemId = id;
            // return item * item;
            console.log();
          });
          // console.log(this.$store.state.cartList);

          // 注意此时修改 value 后会再次触发 change 事件
          this.value = e;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 添加商品数量
    // add(id, count) {
    //   console.log(id);
    //   addGoods(id, count)
    //     .then((data) => {
    //       Toast(data.message);
    //     })
    //     .catch((error) => {
    //       Toast(error.message);
    //       console.log(error);
    //       this.del(id, count);
    //     });
    // },

    // 减少商品数量
    // del(id, count) {
    //   deleteGoods(id, count)
    //     .then((data) => {
    //       console.log(data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  },
  computed: {
    //通过计算属性拿到Vuex state
    list: {
      get() {
        return this.$store.state.cartList;
      },
    },
    //总价
    totalMoney() {
      return this.list.reduce((prev, cur) => {
        // 按照选中的商品计算的 （checked）
        return (
          prev + (cur.checked ? cur.goodsCount * cur.sellingPrice * 100 : 0)
        );
      }, 0);
    },
    //是否全选
    checkAll: {
      get() {
        //依赖item.checked每当item.checked发生变化就执行一次getter
        return this.list.every((item) => item.checked);
      },
      set(val) {
        console.log(val);
        // checkAll改变就执行
        this.list.forEach((item) => (item.checked = val));
      },
    },
  },
};
</script>

<style scoped lang="less">
.van-card {
  position: relative;

  .van-card__header {
    margin-left: 0.8rem;
  }
}

.van-check {
  position: absolute;
  top: 1.0667rem;
  left: 0.2667rem;
  z-index: 999;
}

.van-stepper {
  position: absolute;
  bottom: 0;
  right: 0.5333rem;
  z-index: 999;
}

.container {
  // margin-top: 1.2rem;
  margin-bottom: 3.7333rem;
}

.van-submit-bar {
  bottom: 50px;
}

.delete-button {
  height: 100%;
  background-color: #08d9d6;
}

/deep/.van-checkbox__icon--checked .van-icon {
  background-color: #08d9d6;
  border-color: #08d9d6;
}

.van-submit-bar__button--danger {
  background: linear-gradient(to right, #00adb5, #08d9d6);
}

.van-nav-bar .van-icon {
  color: #08d9d6;
}

.empty {
  margin: 0 auto;
  text-align: center;
  width: 50%;
  font-size: 0.5rem;

  .van-icon-smile-o {
    font-size: 1.5rem;
  }
}
</style>
