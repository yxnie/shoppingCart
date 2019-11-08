<template>
  <div class="all">
    <div class="back" @click="goBack">
      <van-icon name="arrow-left" color="white" class="pic" />
    </div>
    <div class="from">
      <div class="title">登录 / 注册</div>
      <div class="name border"><van-field v-model="user.nickname" placeholder="USERNAME" /></div>
      <div class="name border">
        <van-field
          v-model="user.password"
          type="password"
          placeholder="PASSWORD"
        />
      </div>
      <div class="phone border">
        <van-field label="手机号码" placeholder="仅注册需要" />
      </div>
      <div class="phoneCode border">
        <van-field center label="短信验证码" placeholder="仅注册需要">
          <van-button slot="button" size="small" type="primary"
            >发送验证码</van-button
          >
        </van-field>
      </div>
      <div class="code">
        <van-field
          v-model="user.verify"
          label="验证码"
          placeholder="请输入验证码"
          class="border"
        />
        <div v-html="code" @click="getAverify" class="img"></div>
      </div>
      <div class="but">
        <van-button type="primary" size="normal" class="left" @click="login(user.nickname,user.password,user.verify)">登录</van-button
        ><van-button type="danger" size="normal" class="right" @click="register(user.nickname,user.password,user.verify)">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      user: {
        nickname: "",
        password: "",
        verify: ""
      },
      code: ""
    };
  },
  methods: {
    //获取验证码url
    async getAverify() {
      try {
        let res = await this.$api.getAverify();
        let code = res.slice(res.lastIndexOf("/"));
        this.getCode(code);
      } catch (e) {
        console.log(e);
      }
    },
    //获取验证码
    getCode(code) {
      axios
        .get(`/api/${code}`)
        .then(res => {
          this.code = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //注册
    async register(nickname, password, verify) {
      try {
        let res = await this.$api.register(nickname, password, verify);
        if (res.code === 200) {
          this.$store.state.user = res.userInfo; //用户存入store
          // console.log(this.$store.state.user,2);
          localStorage.setItem("name", JSON.stringify(this.user)); //用户存入localstorage
          this.$router.push("/userPage");
        }else {
          this.getAverify();
          this.user.verify = "";
        }
        this.$toast(res.msg);
      } catch (e) {
        console.log(e);
      }
    },
    //登录
    async login(nickname, password, verify) {
      try {
        let res = await this.$api.login(nickname, password, verify);
        if (res.code === 200) {
          this.$store.state.user = res.userInfo; //用户存入store
          // console.log(this.$store.state.user,1);
          localStorage.setItem("name", JSON.stringify(this.user)); //用户存入localstorage
          this.$router.push("/userPage");
        }else {
          this.getAverify();
          this.user.verify = "";
        }
        this.$toast(res.msg);
      } catch (e) {
        console.log(e);
      }
    },
    //返回上一页面
    goBack() {
      this.$router.back();
    }
  },
  mounted() {
    this.getAverify();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.all {
  height: 100vh;
  background: url("../../assets/images/login.jpeg") no-repeat;
  background-size: cover;
}
.back {
  z-index: 99;
  position: fixed;
  left: 10px;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(91, 92, 86, 0.51);
  text-align: center;
  font-size: 25px;
  .pic {
    position: relative;
    top: 6px;
    left: -1px;
  }
}
.from {
  background: white;
  opacity: 0.7;
  margin: 0 15px;
  position: relative;
  top: 100px;
  padding: 10px;
  box-shadow: 5px 5px 10px rgba(97,98,92,0.8);
  .code {
    display: flex;
    margin-top: 10px;
    .img {
      position: relative;
      top: 5px;
      margin-left: 10px;
    }
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    color: black;
    margin-bottom: 10px;
    margin-top: 5px;
  }
  .border {
    border-bottom: 1px solid rgba(132,133,127,0.51);
  }
  .phoneCode {
    margin-top: 2px;
  }
  .name {
    margin-top: 25px;
  }
  .phone {
    margin-top: 20px;
  }
  .but {
    margin: 35px 0;
    .left {
      width: 100px;
    }
    .right {
      width: 100px;
      margin-left: 15px;
    }
  }
}
</style>
