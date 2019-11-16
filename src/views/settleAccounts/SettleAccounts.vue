<template>
  <div>
    <top>
      订单结算
    </top>
    <div class="title">
      <div v-if="defaultAddress">
        <div class="people" v-if="defaultAddress">
          <div class="right" @click="skip">
            <van-icon name="arrow" size="26px" />
          </div>
          <div class="location"><van-icon name="location-o" size="35px" /></div>
          <div class="info">
            <div class="name">
              <div>收货人：{{ defaultAddress.name }}</div>
              <div>电话：{{ defaultAddress.tel }}</div>
            </div>
            <div class="address">收货地址：{{ defaultAddress.address }}</div>
            <div class="remind">（收货不便时，可选择免费待收货服务）</div>
          </div>
        </div>
      </div>
      <div v-else class="noAddress" @click="skip">
        暂无收货地址
      </div>
      <div class="line">
        <img src="../../assets/images/caitiao.jpg" alt="" />
      </div>
    </div>
    <div class="allGoods" ref="wrapper">
      <div>
        <div v-for="(item, index) in checkedGoods" :key="index" class="good">
          <div class="con">
            <div class="pic"><img :src="item.image_path" alt="" /></div>
            <div class="word">
              <div class="goodsTitle">{{ item.name }}</div>
              <div class="num">
                <div class="price">
                  ￥<span>{{ item.mallPrice }}</span>
                </div>
                <div class="count">× {{ item.count }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <van-submit-bar
        :price="allPrice * 100"
        button-text="提交订单"
        @submit="onSubmit"
        :disabled="lock"
      />
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import top from "../../components/public/Top";
export default {
  name: "SettleAccounts",
  components: {
    top
  },
  props: {},
  data() {
    return {
      defaultAddress: null,
      checkedGoods: [],
      allPrice: null,
      lock: false
    };
  },
  methods: {
    //获取默认收货地址
    async getDefaultAddress() {
      try {
        let res = await this.$api.getDefaultAddress();
        if (res.code === 200) {
          this.defaultAddress = res.defaultAdd;
        }
      } catch (e) {
        console.log(e);
      }
    },
    //跳转地址列表页面
    skip() {
      this.$router.push("addressList");
    },
    //订单接口
    async placeOrder() {
      let obj = {};
      obj.address = this.defaultAddress.address;
      obj.tel = this.defaultAddress.tel;
      obj.totalPrice = this.allPrice;
      obj.count = this.checkedGoods[0].count;
      let arr = [];
      this.checkedGoods.map(item => {
        arr.push(item.cid);
      });
      obj.orderId = arr;
      if (this.checkedGoods[0].idDirect) {
        obj.idDirect = true;
      }
      try {
        let res = await this.$api.placeOrder(obj);
        if (res.code === 200) {
          this.lock = true;
          this.$toast(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //提交订单
    async onSubmit() {
      this.$dialog
        .confirm({
          message: `您本次购买商品总价为${this.allPrice}`
        })
        .then(() => {
          this.placeOrder();
          this.$router.push("/");
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.checkedGoods = this.$store.state.checkedGoods;
    this.allPrice = this.$store.state.allPrice;
    this.getDefaultAddress();
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        startY: 0
      });
    });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.title {
  margin-top: 50px;
  .line {
    img {
      display: block;
      height: 3px;
    }
  }
}
.people {
  display: flex;
  width: 94%;
  padding: 0 3%;
  height: 100px;
  position: relative;
  background: white;
  .location {
    line-height: 100px;
    margin-right: 15px;
  }
  .right {
    position: absolute;
    right: 10px;
    top: 37px;
  }
  .info {
    flex: 1;
    .name {
      display: flex;
      justify-content: space-between;
      line-height: 33px;
      font-size: 14px;
      color: black;
      width: 88%;
    }
    .address {
      line-height: 33px;
      height: 33px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 88%;
      font-size: 12px;
    }
    .remind {
      width: 88%;
      line-height: 33px;
      font-size: 14px;
      color: #ff9b0c;
    }
  }
}
.noAddress {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 18px;
  background: white;
}
.allGoods {
  z-index: -99;
  position: fixed;
  background: white;
  top: 153px;
  bottom: 50px;
  width: 92%;
  padding: 0 4%;
  .good {
    display: flex;
    padding: 10px 0;
    .con {
      flex: 1;
      display: flex;
      justify-content: space-between;
      .pic {
        width: 60px;
      }
      .word {
        flex: 1;
        margin-left: 15px;
        color: red;
        position: relative;
        .goodsTitle {
          width: 90%;
          font-size: 17px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          height: 20px;
          line-height: 20px;
        }
        .num {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          .price {
            line-height: 28px;
            font-weight: bold;
            flex: 1;
          }
          .count {
            line-height: 28px;
            color: black;
          }
        }
      }
    }
  }
}
</style>
