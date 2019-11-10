<template>
  <div class="all">
    <div class="title">商品推荐</div>
    <div ref="wrapper" class="one">
      <div class="wrapper">
        <div v-for="(item, index) in recommend" :key="index" class="content">
          <div><img :src="item.image" alt="" @click="shipInfo(item)" /></div>
          <div class="name">{{ item.goodsName }}</div>
          <div class="word">
            <span>￥{{ item.price }}</span
            ><span
              ><s class="mallPrice">￥{{ item.mallPrice }}</s></span
            >
          </div>
          <div class="but">
            <div class="but1" @click="addShop(item)"><van-icon name="shopping-cart-o" /></div>
            <div class="but2" @click="shipInfo(item)">查看详情</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Recommend",
  components: {},
  props: {
    recommend: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    //前往详情
    shipInfo(item) {
      this.$router.push({
        name: "productDetails",
        query: { id: item.goodsId }
      });
    },
    //加入购物车
    async addShop(item) {
      try {
        let res = await this.$api.addShop(item.goodsId);
        if (res.code === 200) {
          this.$toast(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        click: true
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
img {
  width: 125px;
}
.one {
  display: flex;
}
.all {
  width: 100%;
  margin-top: 25px;
  overflow: hidden;
  background: white;
  .title {
    font-size: 18px;
    margin: 10px 20px;
  }
  .wrapper {
    flex: 1;
    display: flex;
    .content {
      flex: 1;
    }
  }
}
.name {
  height: 14px;
  font-size: 14px;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.word {
  font-size: 18px;
  .mallPrice {
    color: #b6b6b6;
    font-size: 13px;
    margin-left: 8px;
  }
}
.but {
  width: 90%;
  margin: 5%;
  display: flex;
  font-size: 14px;
  color: white;
  border-radius: 6px;
  .but1 {
    text-align: center;
    background: #feca3a;
    padding: 10px;
    border-radius: 6px 0 0 6px;
  }
  .but2 {
    background: #ff4c38;
    padding: 10px;
    border-radius: 0 6px 6px 0;
  }
}
</style>
