<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" fixed>
      <template #right>
        <van-search
          placeholder="全场50元起步"
          disabled
          @click="handlerSearch"
        />
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <div class="main">
      <van-sidebar v-model="classifyKey" @change="onChange">
        <!-- 遍历渲染主类 -->
        <van-sidebar-item
          v-for="(item, i) in classify"
          :key="item.categoryId"
          @click="classSwitch(i)"
          :title="item.categoryName"
        />
      </van-sidebar>
      <div class="category">
        <!-- 遍历渲染二级分类 -->
        <div class="secondMenu" v-for="(cate, i) in category" :key="i">
          <div v-for="(cateItem, i) in cate" :key="i">
            <h3 ref="abc">{{ cateItem.categoryName }}</h3>
            <van-grid :border="false" :column-num="3">
              <!-- 遍历渲染三级分类 -->
              <van-grid-item
                v-for="(type, i) in cateItem.thirdLevelCategoryVOS"
                :key="i"
                @click="categoryIdSearch(type.categoryId)"
              >
                <div style="text-align: center">
                  <i style="color: #08d9d6" class="iconfont icon-icon2"></i>
                  <p>{{ type.categoryName }}</p>
                </div>
              </van-grid-item>
            </van-grid>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入数据
import { goodsCategory } from "../../api/index";
// import data from '../data.json'
export default {
  data() {
    return {
      // 侧边内容
      classify: [],
      //默认显示侧边栏索引为0的菜单内容
      classifyKey: 0,
      // 二级,三级分类
      category: [],
    };
  },
  mounted() {
    goodsCategory().then((data) => {
      console.log(data);
      this.classify = data.data;
      // 默认二级三级分类显示的数据
      this.category.push(this.classify[0].secondLevelCategoryVOS);
      console.log(this.category);
      // console.log(this.category[0].thirdLevelCategoryVOS); 
    });
  },
  methods: {
    onChange(i) {
      console.log(i);

    },
    //分类到搜索
    categoryIdSearch(id) {
      console.log(id);
      this.$router.push({
        path: "/product-list",
        query: { goodsCategoryId: id },
      });
    },
    // 点击主类级别导航切换
    classSwitch(i) {

      // this.classify = data.data
      // goodsCategory().then((data) => {
      //   this.classify = data.data
      // })
      // console.log(this.category);
      // this.category.splice(0, 1, this.classify[i].secondLevelCategoryVOS)
      let arr = [];
      arr.push(this.classify[i].secondLevelCategoryVOS);
      this.category = arr;
      // console.log(this.category[0][0].thirdLevelCategoryVOS);
    },
    handlerSearch() {
      this.$router.push("/product-list");
    },
  },
};
</script>
<style lamg="less" scoped>
div.main {
  display: flex;
  margin-top: 1.2rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: .5rem;
  color: #311d3f;
}

p {
  font-size: 0.33rem;
}

.van-search {
  padding: 0.26667rem 1rem;
}

.van-sidebar {
  width: 3.1rem;
  position: fixed;
  top: 1.2rem;
  left: 0;
}

.category {
  width: 7rem;
  margin-left: 3.3rem;
  display: block;
}

.secondMenu{
  margin-top: .625rem;
}
.van-sidebar-item--select::before {
  background-color: #08d9d6;
}
</style>
