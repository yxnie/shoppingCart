<template>
  <div class="all">
    <top>
      <div slot="back"></div>
      会员中心
    </top>
    <div class="center">
      <settings v-if="!data"></settings>
      <div class="head">
        <img
          src="http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg"
          alt=""
        />
      </div>
      <div class="username" v-if="data">欢迎您：{{ data.nickname }}</div>
      <div v-else class="username"></div>
      <div class="loginOut">
        <div v-if="data" @click="loginOut">退出登录</div>
        <div v-else @click="login">登录/注册</div>
      </div>
    </div>
    <bar></bar>
    <div class="foot">
      <div class="word top">
        <van-icon name="arrow" class="go" />
        <van-icon name="orders-o" />
        <div class="desc">全部订单</div>
      </div>
      <div class="word">
        <van-icon name="arrow" class="go" />
        <van-icon name="star-o" />
        <div class="desc">收藏商品</div>
      </div>
      <div class="word" @click="skip('/addressList')">
        <van-icon name="arrow" class="go" />
        <van-icon name="map-marked" />
        <div class="desc">地址管理</div>
      </div>
      <div class="word">
        <van-icon name="arrow" class="go" />
        <van-icon name="eye-o" />
        <div class="desc">最近浏览</div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../../components/public/Top";
import bar from "../../components/userPage/Bar";
import settings from "../../components/userPage/Settings";
export default {
  name: "UserPage",
  components: {
    top,
    bar,
    settings
  },
  props: {},
  data() {
    return {};
  },
  methods: {
    async loginOut() {
      try {
        let res = await this.$api.loginOut();
        if (res.code === 0) {
          this.$store.state.user = null;
          localStorage.removeItem("name");
          this.$toast("退出成功，感谢你的光顾");
        }
      } catch (e) {
        console.log(e);
      }
    },
    login() {
      this.$router.push("/login");
    },
    skip(path){
      this.$router.push(path);
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {
    data() {
      return this.$store.state.user;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.all {
  height: 100vh;
  background: white;
}
.center {
  background: #e30c7b;
  margin-top: 51px;
  color: white;
  font-size: 20px;
  text-align: center;
  position: relative;
  padding: 25px;
  height: 188px;
  .head {
    display: flex;
    justify-content: center;
    margin: 10px;
    img {
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  .username {
    margin: 20px;
    font-weight: bold;
    height: 20px;
  }
  .loginOut {
    font-size: 18px;
  }
}
.foot {
  margin: 0 10px;
}
.word {
  display: flex;
  position: relative;
  font-size: 17px;
  margin: 25px 0;
  .go {
    position: absolute;
    right: 5px;
  }
  .desc {
    margin-left: 10px;
  }
}
.top {
  margin-bottom: 50px;
}
</style>
