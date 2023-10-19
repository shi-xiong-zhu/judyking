<template>
  <div>
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      fixed
    >
      <template #right>
        <van-search
          v-model="value"
          @search="handlerSearch"
        />
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
    <!--  -->
    <van-tabs
      color="#08d9d6"
      type="card"
      v-model="action"
      @click="handlerEle"
    >
      <van-tab
        v-for="item in tabs"
        :key="item.text"
        :title="item.text"
      >
      </van-tab>
    </van-tabs>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="触碰我的底线了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="item in list"
        :key="item.goodsId"
      >
        <van-card
          :price="item.sellingPrice"
          :desc="item.goodsIntro"
          :title="item.goodsName"
          :thumb="item.goodsCoverImg"
        />
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { SearchFromhome, categoryGohome } from "../../api/index";
export default {
  name: "App",
  created() {
    //从三级分类带id进行搜索 
    categoryGohome(
      this.pageNumber++,
      this.$route.query.goodsCategoryId,
      this.value,
      this.orderBy
    ).then((data) => {
      this.list = data.data.list;
      console.log(data);
    });
  },
  components: {},
  data() {
    return {
      value: "", //输入的关键词
      pageNumber: 1,
      action: 0, //默认选中那个tab
      list: [], //搜索出来的列表数据
      loading: false, //未在加载状态
      finished: false, //是否已加载完成，加载完成后不再触发load事件
      orderBy: "", //来自tabs[val].orderBy
      tabs: [
        {
          text: "推荐",
          orderBy: "recommend",
        },
        {
          text: "新品",
          orderBy: "new",
        },
        {
          text: "价格",
          orderBy: "price",
        },
      ],
    };
  },
  methods: {
    // 搜索时触发
    handlerSearch(val) {
      if (val === "") {
        this.finished = true;
        this.loading = false;
      }
      // 进到搜索页面会请求一次，在搜索时会从第二页开始
      this.pageNumber = 1;
      // 执行列表加载函数  发送请求
      this.onLoad();
    },
    //切换tab时执行
    // handlerEle() {
    //   this.finished = true;
    // },
    // 
    // 实现懒加载
    onLoad() {
      if (this.value === "") {
        this.finished = true;
        this.loading = false;
      } else {
        this.finished = false;
        SearchFromhome(this.pageNumber++, this.value, this.orderBy).then(
          (data) => {
            if (data.data.list.length == 0) {
              this.finished = true;
            }
            this.list = this.list.concat(data.data.list);
            console.log(this.list);
            this.loading = false;
          }
        );
      }
    },
  },
  watch: {
    // 监听action的值（立即侦听开启）
    action: {
      handler: function (val) {
        this.orderBy = this.tabs[val].orderBy;
        // 在发送ajax之前，需要把pageNumber变成1
        this.pageNumber = 1;
        // 把list清空
        this.list = [];
        // 切换新的tab之后，finished要设置成false，因为之前有可能变成了true
        this.finished = false;
        this.onLoad();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="less">
.van-search {
  padding: 0.26667rem 1rem;
}

.van-tabs {
  width: 100%;
  position: fixed;
  top: 1.2rem;
  z-index: 999;

  .van-tab {
    width: 100%;
    border: 1px solid #08d9d6;
  }
}

.van-list {
  margin-top: 2rem;
}
</style>