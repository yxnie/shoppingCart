<template>
  <div class="all">
    <div class="back" @click="goBack">
      <van-icon name="arrow-left" color="white" class="pic" />
    </div>
    <div ref="wrapper" class="wrapper">
      <div class="content" v-if="data.goodsOne">
        <swipe :data="data.goodsOne" v-if="data.goodsOne"></swipe>
        <div class="center">
          <div class="name">{{ data.goodsOne.name }}</div>
          <div class="price">￥{{ data.goodsOne.present_price }}</div>
          <div class="amount">
            <div>运费： {{ data.goodsOne.__v }}</div>
            <div>剩余： {{ data.goodsOne.amount }}</div>
            <div class="like">
              <span v-if="lock"
                >收藏 : <van-icon name="like-o" size="20px" @click="collection(data.goodsOne)" class="img"
              /></span>
              <span v-else
                >取消收藏 : <van-icon name="like" color="red" size="20px" @click="cancelCollection(id)" class="img"
              /></span>
            </div>
          </div>
        </div>
        <div class="shop">
          <div>
            <van-icon name="shop-o" class="shop_o" />有赞的店<van-tag
              type="danger"
              class="danger"
              >官方</van-tag
            >
          </div>
          <div>进入店铺<van-icon name="arrow" class="arrow" /></div>
        </div>
        <detail :data="data.goodsOne"></detail>
      </div>
    </div>
    <goodsAction :id="id" :goodsOne="data.goodsOne"></goodsAction>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import swipe from "../../components/productDetails/Swipe";
import goodsAction from "../../components/productDetails/GoodsAction";
import detail from "../../components/productDetails/Details";
export default {
  name: "ProductDetails",
  components: {
    swipe,
    goodsAction,
    detail
  },
  props: {},
  data() {
    return {
      data: {}, //商品详情数据
      id: "", //商品id
      lock: true //控制收藏开关
    };
  },
  methods: {
    //获取商品数据
    async goodOne(id) {
      try {
        let res = await this.$api.goodOne(id);
        this.data = res.goods;
        if (res.code === 200) {
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
    //收藏
    async collection(goods) {
      try {
        let res = await this.$api.collection(goods);
        if (res.code === -1) {
          this.$router.push("/login");
        }else {
          this.lock = false;
        }
        this.$toast(res.msg);
      } catch (e) {
        console.log(e);
      }
    },
    //取消收藏接口
    async cancelCollection(id) {
      try {
        let res = await this.$api.cancelCollection(id);
        if (res.code === 200){
          this.lock = true;
        }
      } catch (e) {
        console.log(e);
      }
    },
    //返回上一页面
    goBack() {
      this.$router.back();
    },
    //判断是否收藏
    async isCollection(id) {
      try {
        let res = await this.$api.isCollection(id);
        if (res.isCollection) {
          this.lock = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.isCollection(this.id);
    this.goodOne(this.id);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
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
.all {
  background: white;
}
.center {
  padding: 15px;
  .name {
    font-size: 18px;
    color: black;
    padding-bottom: 10px;
  }
  .price {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .amount {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    line-height: 22px;
    .like {
      width: 80px;
      text-align: right;
      position: relative;
      padding-right: 25px;
      .img {
        position: absolute;
        right: 0;
      }
    }
  }
}
.shop {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  line-height: 30px;
  .shop_o {
    margin-right: 6px;
    font-size: 22px;
    position: relative;
    top: 5px;
  }
  .danger {
    margin-left: 12px;
  }
  .arrow {
    margin-left: 10px;
    position: relative;
    top: 4px;
  }
}
.wrapper {
  overflow: hidden;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 50px;
}
.content {
  /*width: 100%;*/
}
</style>
