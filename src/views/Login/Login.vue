<template>
  <div class="login_box">
    <van-nav-bar :title="isLogin ? '登录' : '注册'" left-arrow @click-left="backFn">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
    <div class="tupian">
      <img src="http://s.weituibao.com/1582958061265/mlogo.png" alt="">
    </div>
    <van-form @submit="onSubmit" class="form_box">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
      <Verify @success="alertFn(1)" @error="alertFn(2)" :type="2" :showButton="false" ref="veri"></Verify>
      <p @click="isLogin = !isLogin">
        {{ isLogin ? "立即注册" : "已有账号,立即登录" }}
      </p>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">{{
          isLogin ? "登录" : "注册"
        }}</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Verify from "vue2-verify";
import { register, login } from "../../api/index"
export default {
  name: "Login",
  components: { Verify },
  data() {
    return {
      username: "",
      password: "",
      flag: false, // 记录验证码是否通过的
      isLogin: true, // 记录是登录 还是  注册
    };
  },
  methods: {
    backFn() {
      this.$router.back();
    },
    alertFn(val) {
      this.flag = val == 1 ? true : false;
    },
    onSubmit() {
      this.$refs.veri.checkCode();
      if (this.flag) {
        if (this.isLogin) {
          // 证明是要登录的
          login(this.username, this.password).then((data) => {
            if (data.resultCode == 200) {
              // 登录成功之后  把token存到本地  跳到首页
              localStorage.setItem("xftoken", data.data);
              if (this.$route.query.needback == 1) {
                this.$router.back();
              } else {
                this.$router.replace("/home");
              }
            }
          });
          console.log("登录....");
        } else {
          // 证明是要注册的
          console.log("注册....");
          register(this.username, this.password).then((data) => {
            if (data.resultCode == 200) {
              // 注册成功之后 跳到登录
              this.isLogin = true;
            }
          });
        }
      } else {
        this.$refs.veri.refresh();
      }
    },
  },
  watch: {
    isLogin() {
      this.username = "";
      this.password = "";
      this.$refs.veri.refresh();
    },
  },
};
</script>

<style lang='less' scoped>
.login_box {
  min-height: 100vh;
}

.form_box {
  width: 80%;
  margin: auto;

  /deep/.cerify-code-panel {
    display: flex;
  }

  /deep/.verify-code {
    flex-grow: 1;
    height: 40px;
  }

  /deep/.verify-code-area {
    display: flex;
    flex-grow: 2;
    font-size: .4rem;
    align-items: center;
  }

  p {
    font-size: .4rem;
    color: #1baeae;
  }
}


.tupian {
  width: 100%;
  text-align: center;
}
</style>