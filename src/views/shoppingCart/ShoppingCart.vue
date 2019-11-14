<template>
  <div>
    <van-loading v-if="lock" type="spinner" color="#1989fa" class="loading" size="50px"/>
    <div v-else>
      <top>
        <div slot="back"></div>
        购物车
      </top>
      <div v-if="login === null">
        <div class="allPage">
          <div class="all">
            <div class="empty">
              <div class="icon"><van-icon name="shopping-cart-o" size="150px" color="red"/></div>
              <div class="but" @click="goLogin"><van-button round type="info" size="large">去登录</van-button></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="shopList.length" class="all">
        <goodsList :shopList="shopList"></goodsList>
      </div>
      <div v-else class="all">
        <div class="empty">
          <div class="icon"><van-icon name="shopping-cart-o" size="150px" color="red"/></div>
          <div>您的购物车还是空空的哦</div>
          <div class="but"><van-button round type="info" size="large" @click="goShopping">去购物</van-button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../../components/public/Top";
import goodsList from "../../components/shoppingCart/GoodsList";
export default {
  name: "ShoppingCart",
  components: {
    top,
    goodsList
  },
  props: {},
  data() {
    return {
      shopList: [],
      lock: true //加载页面开关
    };
  },
  methods: {
    async getCard() {
      try {
        let res = await this.$api.getCard();
        this.shopList = res.shopList;
        this.lock = false;
      } catch (e) {
        console.log(e);
      }
    },
    goShopping() {
      this.$router.push("/");
    },
    goLogin() {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getCard();
  },
  created() {},
  filters: {},
  computed: {
    login() {
      return this.$store.state.name;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.loading {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  text-align: center;
  line-height: 100vh;
  background: white;
}
.allPage {
  margin-top: 51px;
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background: white;
}
.empty {
  text-align: center;
  .icon {
    padding-top: 50px;
    padding-bottom: 20px;
  }
  .but {
    width: 110px;
    margin: 30px auto;
  }
}
</style>
