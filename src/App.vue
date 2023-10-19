<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view key="1"></router-view>
    </transition>
    <TabBar v-show="isShow" key="2"></TabBar>
  </div>
</template>
<script>
import TabBar from "./components/TabBar.vue"
export default {
  components: {
    TabBar
  },
  data() {
    return {
      isShow: true,
      transitionName: 'slide-left',
    }
  },
  watch: {
    // $route(to, from){
    //   let arr = ['/home', '/my', '/cart']

    //   if(arr.includes(to.path)){
    //     this.isShow = true
    //   }
    //   else{
    //     this.isShow = false
    //   }
    // }
    // $route: {
    //   handler: (val, oldVal) => {
    //     console.log(val.meta.index);
    //   },
    //   immediate: true,
    // },
    $route(to, from) {
      this.isShow = this.$route.meta.isShowNav;
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left' // 向左滑动
      } else if (to.meta.index < from.meta.index) {
        // 由次级到主级
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = ''   //同级无过渡效果
      }
    },
  }
}
</script>
<style  lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  backface-visibility: hidden;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
