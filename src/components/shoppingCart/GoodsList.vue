<template>
  <div class="all">
    <div class="top">
      <div class="diamonds">
        <van-checkbox
          v-model="lock"
          checked-color="red"
          shape="square"
          @click="checkAll"
          >全选</van-checkbox
        >
      </div>
      <div class="back">
        合计：<span class="color">￥{{ allPrice }}</span>
      </div>
    </div>
    <div class="allGoods">
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
                <van-stepper v-model="item.count" integer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      num: null
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
    }
  },
  mounted() {},
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
  margin: 0 10px;
  padding-top: 20px;
}
.top {
  display: flex;
  justify-content: space-between;
  height: 40%;
  line-height: 40px;
  .diamonds {
    position: relative;
    top: 10px;
  }
  .back {
    margin-right: 50px;
    .color {
      color: red;
    }
  }
}
.allGoods {
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
          font-size: 17px;
          overflow: hidden;
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
</style>
