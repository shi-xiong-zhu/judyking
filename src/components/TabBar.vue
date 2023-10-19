<template>
  <div class="bot_nav_box">
    <router-link to="/home" class="item_box" tag="div">
      <div class="icon iconfont icon-shouye"></div>
      <div class="text">首页</div>
    </router-link>
    <router-link to="/category" class="item_box" tag="div">
      <div class="icon iconfont  icon-fenlei"></div>
      <div class="text">分类</div>
    </router-link>
    <router-link to="/cart" class="item_box" tag="div">
      <div class="icon iconfont icon-shouye1 ">
        <van-badge color="#08d9d6" :content="$store.getters.cartNum" v-show="$store.getters.cartNum" />
      </div>
      <div class="text">购物车</div>
    </router-link>
    <router-link to="/user" class="item_box" tag="div">
      <div class="icon iconfont icon-wode"></div>
      <div class="text">我的</div>
    </router-link>
  </div>
</template>

<script>
export default {

};
</script>

<style lang='less' scoped>
.bot_nav_box {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  box-shadow: 0 0px 8px 7px #ccc;
  background: #fff;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;

  .item_box {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &.router-link-exact-active {
      color: #1baeae;
    }

    .icon {
      .van-icon {
        font-size: 30px;
      }
    }

    .iconfont {
      font-size: 0.55rem;
    }

    .text {
      font-size: .24rem
    }
  }
}

.icon-shouye1 {
  position: relative;
  .van-badge {
    position: absolute;
  }
}
</style>