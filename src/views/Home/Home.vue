<template>
  <div class="home_box">
    <header class="header_box" :class="{ active: !isTop }">
      <div class="left_box">
        <span class="iconfont icon-daohang" :class="{ icon: !isTop }"></span>
      </div>
      <div class="middle_box">
        <input
          type="text"
          placeholder="新峰商城|山河无恙，人间皆安"
          @click="handlerSearch"
        />
      </div>
      <div class="right_box">
        <span class="iconfont icon-wode" :class="{ icon: !isTop }"></span>
      </div>
    </header>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="1000" indicator-color="white">
      <van-swipe-item v-for="item in carousels" :key="item.carouselUrl">
        <img :src="item.carouselUrl" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 小图标 -->
    <van-grid :column-num="5">
      <van-grid-item>
        <template>
          <i class="iconfont icon-chujingchaoshi"></i>
          <i class="txt">新峰超市</i>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template>
          <i class="iconfont icon-fushi"></i>
          <i class="txt">新峰服饰</i>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template>
          <i class="iconfont icon-quanqiugou"></i>
          <i class="txt">全球购</i>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template>
          <i class="iconfont icon-shengxian"></i>
          <i class="txt">新锋生鲜</i>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template>
          <i class="iconfont icon-zhisongdaojia"></i>
          <i class="txt">新峰到家</i>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template>
          <i class="iconfont icon-chongzhijiaofei"></i>
          <i class="txt">充值缴费</i>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template>
          <i class="iconfont icon-temai"></i>
          <i class="txt">9.9元拼</i>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template>
          <i class="iconfont icon-lingquanzhongxin"></i>
          <i class="txt">领券</i>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template>
          <i class="iconfont icon-icon2"></i>
          <i class="txt">省钱</i>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template>
          <i class="iconfont icon-quanbu"></i>
          <i class="txt">全部</i>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 商品组件再次使用-->
    <div class="commodityBgc">
      <Goods :dataItem="newGoodses">
        <template #title>
          <div>
            <h3>新品上线</h3>
          </div>
        </template>
      </Goods>
      <Goods :dataItem="hotGoodses">
        <template #title>
          <div>
            <h3>热销商品</h3>
          </div>
        </template>
      </Goods>
      <Goods :dataItem="recommendGoodses">
        <template #title>
          <div>
            <h3>推荐</h3>
          </div>
        </template>
      </Goods>
    </div>
    <!-- <template #default="qqq">
      <div class="img_box">
        <img :src="qqq.row.goodsCoverImg" alt="" />
      </div>
      <div class="good-desc">
        <div class="price">¥ {{ qqq.row.sellingPrice | money }}</div>
        <div class="title">{{ qqq.row.goodsName }}</div>
      </div>
    </template> -->
  </div>
</template>

<script>
import { getIndexInfo } from "../../api/index";
import Goods from "../../components/Goods.vue";
export default {
  name: "Home",
  components: {
    Goods,
  },
  //获取主页数据
  created() {
    getIndexInfo().then((data) => {
      this.carousels = data.data.carousels;
      this.hotGoodses = data.data.hotGoodses;
      this.newGoodses = data.data.newGoodses;
      this.recommendGoodses = data.data.recommendGoodses;
    });
  },
  mounted() {
    window.addEventListener("scroll", this.changeTop);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.changeTop);
  },
  data() {
    return {
      isTop: true,
      carousels: [],
      hotGoodses: [],
      newGoodses: [],
      recommendGoodses: [],
    };
  },
  methods: {
    //页面滚动与是否改变Nav的颜色
    changeTop() {
      //获取页面卷上去的距离
      let t = document.documentElement.scrollTop || document.body.scrollTop;
      if (t > 50) {
        this.isTop = false;
      } else {
        this.isTop = true;
      }
    },
    handlerSearch() {
      this.$router.push({
        path: "/product-list",
        query: {
          from: "home",
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
// .my-swipe .van-swipe-item {
//   color: #fff;
//   font-size: 20px;
//   line-height: 150px;
//   text-align: center;
//   background-color: #39a9ed;
// }

.home_box {
  .header_box {
    position: fixed;
    width: 100%;
    height: 50px;
    display: flex;
    z-index: 200;
    top: 0;
    left: 0;
    text-align: center;

    .left_box {
      width: 50px;
      flex: none;

      // background: rgba(0, 0, 0, 0.2);
      .icon {
        color: white;
      }

      span {
        color: #1baeae;
        font-size: 0.7rem;
        display: block;
        margin-top: 10px;
      }
    }

    .right_box {
      width: 50px;
      flex: none;

      .icon {
        color: white;
      }

      span {
        color: #1baeae;
        font-size: 0.7rem;
        display: block;
        margin-top: 10px;
        margin-right: 15px;
      }
    }

    .middle_box {
      flex: auto;

      input {
        background-color: hsla(0, 0%, 100%, 0.7);
        margin-top: 10px;
        border-radius: 20px;
        border: 0;
        width: 75%;
        height: 0.8rem;
        font-size: 0.3733rem;
      }
    }

    &.active {
      background: #1baeae;
    }
  }

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;

    img {
      width: 100%;
      height: auto;
    }
  }

  padding-bottom: 2000px;
}

.iconfont {
  font-size: 1rem;
  color: #1baeae;
}

.txt {
  font-size: 0.3rem;
  font-style: normal;
}

// .good-box{
//   .good-item{
//     .img_box{

//     }
//   }
// }
h3 {
  text-align: center;
}

.home_box {
  padding-bottom: 1.6rem;
}

.middle_box {
  input {
    text-align: center;
  }
}
</style>
