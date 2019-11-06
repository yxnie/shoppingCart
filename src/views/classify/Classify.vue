<template>
  <div class="all">
    <div class="top">商品分类</div>
    <div class="foot">
      <div class="left">
        <div
          v-for="(item, index) in categoryData"
          :key="index"
          class="desc"
          @click="left(index)"
        >
          {{ item.mallCategoryName }}
        </div>
      </div>
      <div class="right">
        <van-tabs v-model="active" @click="choose" :ellipsis="false">
          <van-tab
            v-for="(item, index) in categoryData[categoryId].bxMallSubDto"
            :key="index"
            :title="item.mallSubName"
            :name="index"
            class="title"
          >
          </van-tab>
        </van-tabs>

        <div ref="wrapper" class="allGoods">
          <div>
            <div v-for="(item1, index1) in data" :key="index1" class="goods" @click="buy(index1)">
              <div class="img">
                <div class="pic"><img :src="item1.image" alt="" /></div>
              </div>
              <div class="word">
                <div class="name">{{ item1.name }}</div>
                <div class="price">
                  <span class="now">￥{{ item1.present_price }}</span
                  ><span class="old"
                    ><s>￥{{ item1.orl_price }}</s></span
                  >
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
  name: "Classify",
  components: {},
  props: {},
  data() {
    return {
      data: [], //分类数据
      categoryId: "0", //大类id
      id: "0", //小类id
      active: 0 //默认大类id
    };
  },
  methods: {
    //获取数据
    async category(id) {
      try {
        let res = await this.$api.category(id);
        this.data = res.dataList;
      } catch (e) {
        console.log(e);
      }
    },
    //左边大类事件
    left(index) {
      this.categoryId = index;
      this.id = "0";
      this.active = 0;
      this.category(
        this.categoryData[this.categoryId].bxMallSubDto[this.id].mallSubId
      );
    },
    //右边小类事件
    choose(name) {
      this.id = name;
      console.log(1);
      this.category(
        this.categoryData[this.categoryId].bxMallSubDto[this.id].mallSubId
      );
    },
    //跳转详情
    buy(val) {
      this.$router.push({name :"productDetails",query:{id:this.data[val].id}})
    }
  },
  mounted() {
    this.category(
      this.categoryData[this.categoryId].bxMallSubDto[this.id].mallSubId
    );
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
  computed: {
    //分类数据
    categoryData() {
      return this.$store.state.category;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.all {
  background: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .top {
    position: fixed;
    top: 0;
    background: white;
    width: 100%;
    text-align: center;
    font-size: 19px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(119, 120, 114, 0.4);
    z-index: 99;
  }
  .foot {
    position: fixed;
    top: 51px;
    display: flex;
    height: 100%;
    width: 100%;
  }
  .right {
    width: 74%;
    .title {
      position: fixed;
    }
  }
  .left {
    background: #f1f8ff;
    width: 26%;
    height: 100%;
    z-index: 99;
    .desc {
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-bottom: 1px solid rgba(119, 120, 114, 0.4);
    }
  }
}
.allGoods {
  overflow: hidden;
  position: absolute;
  top: 40px;
  bottom: 100px;
}
.goods {
  padding: 5%;
  display: flex;
  background: white;
  font-size: 15px;
  color: red;
  width: 90%;
  .word {
    padding: 10px;
    .name {
      margin-bottom: 15px;
    }
    .price {
      .now {
        margin-right: 10px;
        font-weight: bold;
      }
      .old {
        color: #4e4e4e;
        font-size: 12px;
      }
    }
  }
  .img {
    border: 1px solid rgba(113, 114, 108, 0.5);
    .pic {
      width: 80px;
      img {
        display: block;
      }
    }
  }
}
</style>
