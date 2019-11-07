<template>
  <div>
    <top>
      <div slot="back"></div>
      会员中心
    </top>
    <div class="center">
      <settings :data="data.userInfo"></settings>
      <div class="head" v-if="data.userInfo">
        <img :src="data.userInfo.avatar" alt="" />
      </div>
      <div class="username" v-if="data.userInfo">
        欢迎您：{{ data.userInfo.nickname }}
      </div>
      <div class="loginOut">
        <div v-if="data.code === 200">退出登录</div>
        <div v-else>登录/注册</div>
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
      <div class="word">
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
    return {
      data: {},
    };
  },
  methods: {
    async user() {
      try {
        let res = await this.$api.user();
        this.data = res;
        console.log(this.data, "data");
      } catch (e) {
        console.log(e);
      }
    },

  },
  mounted() {
    this.user();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.center {
  background: #e30c7b;
  margin-top: 51px;
  color: white;
  font-size: 20px;
  text-align: center;
  position: relative;
  padding: 25px;
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
