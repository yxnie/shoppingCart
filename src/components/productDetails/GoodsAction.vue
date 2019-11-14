<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
        text="首页"
        @click="onClickIcon('/')"
      ></van-goods-action-icon>
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="onClickIcon('/shoppingCart')"
      >
      </van-goods-action-icon>
      <div class="num" v-if="num">{{ num }}</div>
      <van-goods-action-button type="warning" text="加入购物车" @click="add" />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="onClickButton"
      ></van-goods-action-button>
    </van-goods-action>
    <van-popup
      v-model="show"
      position="bottom"
      get-container="body"
      :style="{ height: '38%' }"
    >
      <div class="all" v-if="goodsOne">
        <div class="hidden"></div>
        <div class="top">
          <div class="close"><van-icon name="cross" size="14px" /></div>
          <div class="img"><img :src="goodsOne.image" alt=""></div>
          <div class="word">
            <div class="name">{{goodsOne.name}}</div>
            <div class="price">￥{{goodsOne.present_price}}</div>
          </div>
        </div>
        <div class="goodsNum">
          <div class="count"><van-stepper v-model="count" integer /></div>
          <div class="buyNum">购买数量：</div>
          <div class="surplus">剩余 {{goodsOne.amount}}<span>每人限购50件</span></div>
        </div>
        <div class="buy" @click="buy">立即购买</div>
      </div>
    </van-popup>
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
    goodsOne: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      num: 0, //购物车商品数量
      lock: true, //是否添加购物车
      goodNum: 0, //该商品数量
      show: false,
      count: 1
    };
  },
  methods: {
    //前往首页、购物车
    onClickIcon(path) {
      this.$router.push(path);
    },
    onClickButton() {
      this.show = true;
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
        if (res.code === 200) {
          this.$toast("添加成功");
        }
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
        this.editCart(this.goodNum, this.id, this.goodsOne.present_price);
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
    },
    //立即购买
    buy() {
      let arr = [];
      this.goodsOne.count = this.count;
      this.goodsOne.cid = this.goodsOne.id;
      this.goodsOne.idDirect = true;
      arr.push(this.goodsOne);
      this.$store.state.checkedGoods = arr;
      this.$store.state.allPrice = this.count * this.goodsOne.present_price;
      this.$router.push("/settleAccounts");
    }
  },
  mounted() {
    if (localStorage.getItem("name")){
      this.getCard();
    }
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.num {
  position: absolute;
  top: 0;
  left: 78px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: red;
  color: white;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
}
.all {
  position: relative;
  height: 100%;
  .hidden {
    background: rgba(0,0,0,0.7);
    height: 20px;
  }
  .top {
    position: relative;
    display: flex;
    padding: 15px;
    .close {
      position: absolute;
      right: 15px;
      top: 15px;
      height: 18px;
      width: 18px;
      text-align: center;
      line-height: 18px;
      border: 1px solid #655e60;
      border-radius: 50%;
    }
    .img {
      width: 80px;
      position: relative;
      top: -35px;
      img {
        display: block;
      }
    }
    .word {
      margin-left: 15px;
      .name {
      }
      .price {
        color: red;
        margin-top: 15px;
      }
    }
  }
  .goodsNum {
    position: relative;
    font-size: 14px;
    padding: 0 15px;
    .count {
      position: absolute;
      right: 25px;
    }
    .buyNum {

    }
    .surplus {
      margin-top: 15px;
      span {
        color: red;
        margin-left: 20px;
      }
    }
  }
  .buy {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: red;
    color: white;
    text-align: center;
    line-height: 50px;
  }
}
</style>
