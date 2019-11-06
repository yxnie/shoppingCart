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
        <van-tabs v-model="active" @click="choose">
          <van-tab
            v-for="(item, index) in categoryData[categoryId].bxMallSubDto"
            :key="index"
            :title="item.mallSubName"
            :name="index"
          >
            <div class="wrap" ref="wrapper">
              <div class="allGoods content">
                <div
                  v-for="(item1, index1) in data"
                  :key="index1"
                  class="goods"
                >
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
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import BScroll from "better-scroll";
export default {
  name: "Classify",
  components: {},
  props: {},
  data() {
    return {
      data: [],
      categoryId: "0",
      id: "0",
      active: 0
    };
  },
  methods: {
    //获取数据
    async category(id) {
      try {
        let res = await this.$api.category(id);
        this.data = res.dataList;
        // this.$nextTick(() => {
        //   this.scroll = new BScroll(this.$refs.wrapper, {
        //     scrollY: true,
        //     click: true
        //   });
        // });
        // console.log(this.data,"data");
      } catch (e) {
        console.log(e);
      }
    },
    //左边大类事件
    left(index) {
      this.categoryId = index;
      this.id = "0";
      this.active = 0;
      // console.log(this.categoryId,"categoryId");
      this.category(
        this.categoryData[this.categoryId].bxMallSubDto[this.id].mallSubId
      );
    },
    //右边小类事件
    choose(name) {
      // console.log(name,"name");
      this.id = name;
      this.category(
        this.categoryData[this.categoryId].bxMallSubDto[this.id].mallSubId
      );
    }
  },
  mounted() {
    this.category(
      this.categoryData[this.categoryId].bxMallSubDto[this.id].mallSubId
    );
  },
  created() {},
  filters: {},
  computed: {
    categoryData() {
      return this.$store.state.category;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
/*.wrap {*/
/*  height: 567px;*/
/*  overflow: hidden;*/
/*}*/
/*.content {*/
/*  height: 2000px;*/
/*  flex: 1;*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*}*/
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
  }
  .right {
    width: 285px;
  }
  .left {
    background: #f1f8ff;
    width: 90px;
    height: 100%;
    .desc {
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-bottom: 1px solid rgba(119, 120, 114, 0.4);
    }
  }
}
.allGoods {
  position: fixed;
  top: 91px;
}
.goods {
  padding: 15px;
  display: flex;
  background: white;
  font-size: 15px;
  color: red;
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
  .word {
  }
}
</style>
