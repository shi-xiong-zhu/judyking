<template>
  <div class='good'>
    <div class="good-header">
      <slot name='title'>默认标题</slot>
    </div>
    <ul class="good-box">
      <router-link
        :to="'/info/' + item.goodsId"
        tag='li'
        class="good-item"
        v-for='item in dataItem'
        :key='item.goodsId'
      >
        <!-- <slot :row='item'> -->
        <div class="img_box">
          <img
            @click="testClick"
            :src="item.goodsCoverImg"
            alt=""
          >
        </div>
        <div class="good-desc">
          <div class="title">{{ item.goodsName }}</div>
          <div class="price">¥ {{ item.sellingPrice | money }}</div>
        </div>
        <!-- </slot> -->
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Goods",
  props: {
    dataItem: {
      type: [Array],
      requird: true,
    },
  },
  components: {},
  data() {
    return {
      name: "zhufeng",
    };
  },
  methods: {
    testClick() {
      console.log("测试");
    },
  },
};
</script>

<style lang="less" scoped>
.good {
  width: 100%;
  background: rgb(254, 254, 254);
  .good-header {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: 500;
    color: rgb(15, 196, 181);
    background: rgb(245, 244, 244);
  }
  .good-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    .good-item {
      width: 49%;
      background: white;
      margin: 2px 0;
      box-sizing: border-box;
      .img_box {
        width: 90%;
        height: 200px;
        margin: 10px auto;
        overflow: hidden;
      }
      .good-desc {
        .title {
          font-size: 0.32rem;
        }
        .price {
          font-size: 0.32rem;
          color: red;
        }
      }
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>