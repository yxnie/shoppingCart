<template>
  <div class="all">
      <div class="top">
        <div class="diamonds">
          <van-checkbox
              v-model="lock"
              checked-color="red"
              shape="square"
              @click="checkAll"
              class="one"
          ></van-checkbox
          >全选
        </div>
        <div class="back">
          <div class="topTitle" :class="{top1:allPrice}">合计：<span class="color">￥{{ allPrice }}</span></div>
          <div :class="{top2:allPrice}" v-if="allPrice">请确认订单</div>
        </div>
      </div>
    <div class="but" v-if="allPrice">
      <div class="desc">
        <div class="before"><van-button color="linear-gradient(to right, #ff63e7, #fd0fff)" size="small" @click="expurgate">删除</van-button></div>
        <div><van-button color="linear-gradient(to right, #ff63e7, #fd0fff)" size="small" @click="payment">去结算</van-button></div>
      </div>
    </div>
    <div class="allGoods" :class="{allGoods1:allPrice}" ref="wrapper">
      <div>
        <div v-for="(item, index) in shopList" :key="index" class="good">
          <div class="diamonds">
            <van-checkbox
                v-model="item.check"
                class="square"
                checked-color="red"
                shape="square"
                @click="check(item)"
            ></van-checkbox>
          </div>
          <div class="con">
            <div class="pic"><img :src="item.image_path" alt="" /></div>
            <div class="word">
              <div class="title">{{ item.name }}</div>
              <div class="num">
                <div class="price">
                  ￥<span>{{ item.mallPrice }}</span>
                </div>
                <div class="count">
                  <van-stepper v-model="item.count" integer @change="add(item.count,index)" min="0"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "GoodsList",
  components: {},
  props: {
    shopList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      lock: false,
      num: null, //全选判断用
      checkedGoods: [], //选中商品
      checkedId: [] //选中商品id
    };
  },
  methods: {
    //单选
    check(val) {
      this.num = 0;
      val.check = !val.check;
      this.shopList.map(item => {
        //得到完成数
        if (item.check) {
          this.num++;
        }
      });
      if (this.num === this.shopList.length) {
        this.lock = true;
      } else {
        this.lock = false;
      }
    },
    //全选
    checkAll() {
      this.lock = !this.lock;
      if (this.lock) {
        this.shopList.map(item => {
          item.check = true;
        });
      }
      if (!this.lock) {
        this.shopList.map(item => {
          item.check = false;
        });
      }
    },
    //删除
    expurgate() {
      this.shopList.map(item => {
        if (item.check) {
          this.checkedId.push(item.cid);
        }
      });
      this.deleteShop(this.checkedId);
    },
    //结算
    payment() {
      this.shopList.map(item => {
        if (item.check) {
          this.checkedGoods.push(item);
        }
      });
      this.$store.state.checkedGoods = this.checkedGoods;
      this.$store.state.allPrice = this.allPrice;
      this.$router.push("/settleAccounts");
    },
    //修改商品数量
    async add(count,value) {
      if (count) {
        //修改商品数量接口
        try {
          let res = await this.$api.editCart(count,this.shopList[value].cid,this.shopList[value].mallPrice);
          if (res.code === 200) {
            this.$toast(res.msg);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        this.checkedId.push(this.shopList[value].cid);
        try {
          let res = await this.$api.deleteShop(this.checkedId);
          if (res.code === 200) {
            this.shopList.splice(value,1);
            this.checkedId = [];
            this.$toast(res.msg);
            this.$parent.shopList = this.shopList;
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    //删除商品数据接口
    async deleteShop(id) {
      try {
        let res = await this.$api.deleteShop(id);
        if (res.code === 200) {
          this.shopList = this.shopList.filter(item => {
            return item.check === false;
          });
          this.checkedId = [];
          this.$toast(res.msg);
          this.$parent.shopList = this.shopList;
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    if (this.shopList) {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click: true,
          startY: 0
        });
      });
    }
  },
  created() {},
  filters: {},
  computed: {
    allPrice() {
      let all = 0;
      this.shopList.map(item => {
        if (item.check) {
          all = all + item.count * item.mallPrice;
        }
      });
      return all;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.all {
  margin-top: 50px;
  position: relative;
  top: 0;
  bottom: 0;
  background: white;
}
.top {
  display: flex;
  justify-content: space-between;
  height: 60px;
  position: relative;
  width: 92%;
  z-index: 99;
  background: white;
  padding: 0 4%;
  .diamonds {
    margin-top: 20px;
    display: flex;
    .one {
      height: 19px;
      border: 1px solid rgba(53, 50, 52, 0.76);
      position: relative;
      top: -2px;
      margin-right: 10px;
    }
  }
  .back {
    margin-right: 50px;
    .topTitle {
      position: relative;
      top: 20px;
    }
    .top1 {
      top: 0;
    }
    .top2 {
      margin-top: 10px;
    }
    .color {
      color: red;
    }
  }
}
.but {
  height: 30px;
  width: 92%;
  background: white;
  .desc {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    position: relative;
    left: -30px;
  }
  .before {
    margin-right: 10px;
  }
}
.allGoods {
  z-index: -99;
  position: fixed;
  background: white;
  top: 110px;
  bottom: 50px;
  width: 92%;
  padding: 0 4%;
  .good {
    display: flex;
    padding: 10px 0;
    .diamonds {
      position: relative;
      top: 21px;
      margin-right: 10px;
      .square {
        border: 1px solid rgba(53, 50, 52, 0.76);
      }
    }
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
        .title {
          width: 90%;
          font-size: 17px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          height: 20px;
          line-height: 20px;
        }
        .num {
          position: absolute;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          .price {
            line-height: 28px;
            font-weight: bold;
          }
          .count {
            width: 100px;
            position: absolute;
            left: 130px;
          }
        }
      }
    }
  }
}
.allGoods1 {
  top: 140px;
}
</style>
