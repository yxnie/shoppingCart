<template>
  <div>
    <van-loading
      v-if="lock"
      type="spinner"
      color="#1989fa"
      class="loading"
      size="50px"
    />
    <div v-else>
      <top>
        我的订单
      </top>
      <div class="head">
        <div class="title" :class="{ bg: active === 0 }" @click="run(0)">
          全部
        </div>
        <div class="title" :class="{ bg: active === 1 }" @click="run(1)">
          待付款
        </div>
        <div class="title" :class="{ bg: active === 2 }" @click="run(2)">
          待发货
        </div>
        <div class="title" :class="{ bg: active === 3 }" @click="run(3)">
          待收货
        </div>
        <div class="title" :class="{ bg: active === 4 }" @click="run(4)">
          已完成
        </div>
      </div>
      <div class="all" ref="wrapper" v-if="active === 4">
        <div v-if="list.length">
          <div v-for="(item, index) in list" :key="index" class="order">
            <div class="title">
              <div class="orderId">订单编号 : {{ item.order_id }}</div>
              <div class="finish">交易完成</div>
            </div>
            <div
              v-for="(item1, index1) in item.order_list"
              :key="index1"
              class="goods"
            >
              <div class="goodsInfo">
                <div class="goodsPic" @click="skip(item1)">
                  <img :src="item1.image_path" alt="" />
                </div>
                <div class="goodsName" @click="skip(item1)">
                  {{ item1.name }}
                </div>
                <div class="goodsNum">
                  <div>￥{{ item1.mallPrice }}</div>
                  <div class="goodsCount">×{{ item1.count }}</div>
                </div>
              </div>
            </div>
            <div class="public">创建时间 : {{ item.add_time }}</div>
            <div class="public">收货地址 : {{ item.address }}</div>
            <div CLASS="public">
              共{{ item.order_list.length }}件商品 合计：{{ item.mallPrice }}
            </div>
          </div>
        </div>
        <div v-else class="no">暂无订单</div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../../components/public/Top";
import BScroll from "better-scroll";
export default {
  name: "FinishOrder",
  components: {
    top
  },
  props: {},
  data() {
    return {
      active: 4,
      list: [],
      lock: true //加载页面开关
    };
  },
  methods: {
    run(val) {
      this.active = val;
    },
    //获取订单
    async getMyOrder() {
      try {
        let res = await this.$api.getMyOrder();
        if (res.code === 200) {
          this.list = res.list;
          this.lock = false;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.wrapper, {
              scrollY: true,
              click: true,
              startY: 0
            });
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    skip(item) {
      this.$router.push({ name: "productDetails", query: { id: item.cid } });
    }
  },
  mounted() {
    this.getMyOrder();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.head {
  margin-top: 50px;
  width: 100%;
  display: flex;
  background: white;
  .title {
    flex: 1;
    text-align: center;
    padding: 15px 0;
    margin: 0 10px;
  }
  .bg {
    border-bottom: 3px solid red;
  }
}
.loading {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  text-align: center;
  line-height: 100vh;
  background: white;
}
.all {
  position: fixed;
  width: 100%;
  top: 100px;
  bottom: 15px;
  overflow: hidden;
  padding-top: 10px;
  .order {
    background: white;
    width: 94%;
    margin: 0 3% 15px 3%;
    border-radius: 8px;
    box-shadow: 2px 3px 5px rgba(137, 130, 132, 0.78);
    .title {
      display: flex;
      font-size: 14px;
      padding: 10px;
      justify-content: space-between;
      .orderId {
        color: black;
      }
      .finish {
        color: #ed6a0c;
      }
    }
    .goods {
      .goodsInfo {
        display: flex;
        justify-content: space-between;
      }
      .goodsPic {
        width: 70px;
        height: 70px;
        border: 1px solid rgba(160, 153, 155, 0.59);
        border-radius: 8px;
        margin: 10px;
        img {
          display: block;
          border-radius: 8px;
        }
      }
      .goodsName {
        flex: 1;
        padding-top: 10px;
      }
      .goodsNum {
        text-align: right;
        margin-right: 10px;
        font-size: 14px;
        padding-top: 10px;
        .goodsCount {
          margin-top: 8px;
          color: #a9a2a4;
        }
      }
    }
    .public {
      text-align: right;
      overflow: hidden;
      margin-right: 10px;
      height: 28px;
      font-size: 13px;
    }
  }
}
.no {
  margin-top: -15px;
  text-align: center;
  padding-top: 100px;
  height: 100%;
  background: white;
}
</style>
