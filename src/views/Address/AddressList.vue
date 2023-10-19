<template>
  <div>
    <van-nav-bar
      title="地址管理"
      left-arrow
      @click-left='$router.back()'
      fixed
    >
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { getAddressList } from "../../api/index";

export default {
  data() {
    return {
      chosenAddressId: "",
      list: [],
      cartItemIds: [],//购物车商品id
    };
  },

  created() {
    //拿到地址列表数据
    this.getData();
    // 购物车商品ids
    this.cartItemIds = JSON.parse(sessionStorage.getItem("ids"));
    console.log(this.cartItemIds);
  },
  methods: {
    //添加地址
    onAdd() {
      this.$router.push({
        path: "/addressEdit",
        query: {
          cartItemIds: this.cartItemIds,
        },
      });
    },
    //编辑地址
    onEdit(item, index) {
      this.$router.push({
        path: "/addressEdit?addressId=" + item.id,
        query: {
          cartItemIds: this.$route.query.cartItemIds,
        },
      });
    },
    getData() {
      //拿到地址列表数据
      getAddressList().then((data) => {
        // console.log(data);
        this.list = data.data.map(item => {
          //转换格式以便页面显示（组件需要）
          return {
            id: item.addressId,
            name: item.userName,
            tel: item.userPhone,
            address:
              item.provinceName +
              item.cityName +
              item.regionName +
              item.detailAddress,
            isDefault: item.defaultFlag,
          };
        });
      });
    },
  },
  watch: {
    //用到地址列表哪个地址去生成订单
    chosenAddressId(val) {
      // 跳转到生成订单页
      // console.log(this.$route.query.cartItemIds)
      this.$router.push({
        path: "/create-order",
        query: {
          addressId: val,
          cartItemIds: this.cartItemIds,
        },
      });
    },
  },
};
</script>


<style scoped lang="less">
.van-address-list {
  margin-top: 1.3333rem;
}

.van-button {
  background-color: #08d9d6;
  border: 1px solid #08d9d6;
}

/deep/.van-icon-success {
  display: none;
}

.van-tag--danger {
  background-color: #08d9d6;
}
</style>