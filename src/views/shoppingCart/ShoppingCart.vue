<template>
  <div>
    <top>
      <div slot="back"></div>
      购物车
    </top>
    <div v-if="login === null" class="all">
      <div class="empty">
        <div class="icon"><van-icon name="shopping-cart-o" size="150px" color="red"/></div>
        <div class="but"><van-button round type="info" size="large">去登录</van-button></div>
      </div>
    </div>
    <div v-else-if="shopList.length" class="all">
      <goodsList :shopList="shopList"></goodsList>
    </div>
    <div v-else class="all">
      <div class="empty">
        <div class="icon"><van-icon name="shopping-cart-o" size="150px" color="red"/></div>
        <div>您的购物车还是空空的哦</div>
        <div class="but"><van-button round type="info" size="large">去购物</van-button></div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../../components/public/Top";
import goodsList from "../../components/shoppingCart/GoodsList"
export default {
  name: "ShoppingCart",
  components: {
    top,
    goodsList
  },
  props: {},
  data() {
    return {
      shopList:[]
    };
  },
  methods: {
    async getCard() {
      try {
        let res = await this.$api.getCard();
        this.shopList = res.shopList;
        console.log(this.shopList,1);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.getCard();
  },
  created() {},
  filters: {},
  computed: {
    login() {
      return localStorage.getItem("name");
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.all {
  margin-top: 51px;
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
}
</style>
