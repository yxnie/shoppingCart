<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
        text="首页"
        @click="onClickIcon('/')"></van-goods-action-icon>
      <van-goods-action-icon
        icon="cart-o"
        :info="num"
        text="购物车"
        @click="onClickIcon('/shoppingCart')"></van-goods-action-icon>
      <van-goods-action-button type="warning" text="加入购物车" @click="add" />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="onClickButton"></van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: "GoodsAction",
  components: {},
  props: {
    id: {
      type: String,
      default: ""
    },
    price: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      num: 0, //购物车商品数量
      lock: true, //是否添加购物车
      goodNum: 0 //该商品数量
    };
  },
  methods: {
    onClickIcon(path) {
      this.$router.push(path);
    },
    onClickButton() {
      console.log(2);
    },
    //加入购物车
    async addShop(id) {
      try {
        let res = await this.$api.addShop(id);
        if (res.code === 200) {
          this.$toast(res.msg);
          this.lock = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    //已有时改为添加数量
    async editCart(count, id, mallPrice) {
      try {
        let res = await this.$api.editCart(count, id, mallPrice);
        // if (res.code === 200) {
        //   this.$toast(res.msg);
        // }
        console.log(res,"add");
      } catch (e) {
        console.log(e);
      }
    },
    //点击添加购物车
    add() {
      this.goodNum++;
      this.num++;
      if (this.lock) {
        this.addShop(this.id);
      } else {
        this.editCart(this.goodNum, this.id, this.price);
      }
    },
    //购物车数量
    async getCard() {
      try {
        let res = await this.$api.getCard();
        res.shopList.map(item => {
          if (item.cid === this.id) {
            this.lock = false;
            this.goodNum = item.count;
          }
          this.num = this.num + item.count;
        });
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
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss"></style>
