<template>
    <div class="container">
        <van-nav-bar title="账号管理" left-arrow @click-left='$router.back()'>
            <template #right>
                <van-icon name="ellipsis" />
            </template>
        </van-nav-bar>
        <div class="user">
            <p><span>昵称:&nbsp;&nbsp;&nbsp;&nbsp;</span><input type="text" v-model="account.nickName"></p>
            <p><span>个性签名:</span> <input type="text" v-model="account.introduceSign"></p>
            <p><span>修改密码:<input type="text" v-model="pwd"></span></p>
        </div>
        <van-button @click="save" color="#08d9d6">保存</van-button>
        <van-button @click="quitLogin" color="#08d9d6">退出登陆</van-button>
    </div>
</template>

<script>
import { userInfo, saveAccount, quitAccount } from "../../api/index";
export default {
    name: 'Account',
    created() {
        userInfo().then((data) => {
            console.log(data);
            this.account = data.data
        })
    },
    components: {
    },
    data() {
        return {
            pwd: "",
            account: {},
        }
    },
    methods: {
        quitLogin() {
            quitAccount().then((data) => {
                localStorage.removeItem("xftoken")
                this.$router.push("/home");
            })
        },
        save() {
            saveAccount(this.account.nickName, this.account.introduceSign, this.pwd).then((data) => { console.log(data); })
        }
    }
}
</script>

<style scoped lang="less">
.container {
    width: 80%;
    margin: 0 auto;

    .user {
        font-size: .4rem;
        margin-top: .8rem;

        p {
            border-bottom: 1px solid #eee;
            margin-top: .5rem;

            span {
                width: 13.3333rem;
            }

            input {
                background-color: transparent;
                border: 0;
            }
        }
    }

    .van-button {
        width: 100%;
        margin-top: .5333rem;

    }
}
</style>