<template>
  <div>
    <van-nav-bar title="我的" left-arrow @click-left='$router.back()' fixed>
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
    <div class="user">
      <div class="userLogo">
        <img src="../../assets/user.png" alt="">
      </div>
      <div class="txt">
        <p>昵称：{{ info.nickName }}</p>
        <p>登录名：{{ info.loginName }}</p>
        <p>个性签名：{{ info.introduceSign }}</p>
      </div>
    </div>
    <div class="manage">
      <p @click="order">我的订单
        <span>></span>
      </p>
      <p @click="account">账号管理
        <span>></span>
      </p>
      <p @click="address">地址管理
        <span>></span>
      </p>
      <p @click="about">关于我们
        <span>></span>
      </p>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "../../api";
export default {
  data() {
    return {
      info: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    order() {
      this.$router.push('/order')
    },
    account() {
      this.$router.push('/userInfo')
    },
    address() {
      this.$router.push('/addressList')
    },
    about() {
      this.$router.push('/about')
    },
    //我的信息
    async getData() {
      let data = await getUserInfo();
      console.log(data);
      this.info = data.data;
      console.log(data.data)
    },
  },
};
</script>

<style scoped lang="less">
.user {
  width: 90%;
  height: 4rem;
  border-radius: 5%;
  margin: 1.3333rem auto 0;
  background: linear-gradient(90deg, #1baeae, #51c7c7);
  display: flex;
  align-items: center;
  color: aliceblue;

  .userLogo {
    flex-grow: 1;
    width: 35%;
    height: 40%;
    text-align: center;

    img {
      width: 50%;
      height: 100%;
    }
  }

  .txt {
    flex-grow: 2;

    p {
      font-size: .4rem;
    }
  }
}

.manage {
  font-size: .5rem;

  p {
    margin-left: .5rem;
    margin-right: .5rem;
    margin-top: .3rem;
    border-bottom: .0267rem solid #eeeeee;
    color: #444f5a;

    span {
      margin-left: 6rem;
    }
  }
}
</style>