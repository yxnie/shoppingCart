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
        评价中心
      </top>
      <div class="title">
        <div><img src="../../assets/images/evaluate.jpg" alt="" /></div>
        <div class="evaluate">
          <van-tabs v-model="active" @click="roll">
            <van-tab title="待评价"></van-tab>
            <van-tab title="已评价"></van-tab>
          </van-tabs>
        </div>
      </div>
      <div class="fill"></div>
      <div ref="wrapper" class="foot">
        <div v-if="!active && list.length">
          <div v-for="(item, index) in list.concat(more)" :key="index" class="goods">
            <div class="img" @click="goDetails(item.cid)">
              <img :src="item.image_path" alt="" />
            </div>
            <div class="word" @click="goDetails(item.cid)">
              {{ item.name }}
            </div>
            <div class="but" @click="skip('grade', item)">
              <div class="icon"><van-icon name="chat" /></div>
              <div>评论晒单</div>
            </div>
          </div>
        </div>
        <div v-else-if="active && finishList.length">
          <div v-for="(item, index) in finishList" :key="index" class="goods">
            <div class="img" @click="goDetails(item.cid)">
              <img :src="item.goods[0].image_path" alt="" />
            </div>
            <div class="word" @click="goDetails(item.cid)">
              {{ item.goods[0].name }}
            </div>
            <div class="but but1" @click="skip('evaluationDetails', item)">
              <div class="icon"><van-icon name="search" /></div>
              <div>查看评价</div>
            </div>
          </div>
        </div>
        <div v-else class="noOrder">暂无订单</div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import top from "../../components/public/Top";
export default {
  name: "AssessmentCenter",
  components: {
    top
  },
  props: {},
  data() {
    return {
      active: 0, //默认选中
      list: [], //待评价列表
      finishList: [], //已评价列表
      lock: true,
      page: 1,
      more: []
    };
  },
  methods: {
    //待评价
    async tobeEvaluated(page) {
      try {
        let res = await this.$api.tobeEvaluated(page);
        if (res.code === 200) {
          if (page === 1) {
            this.list = res.data.list;
          } else {
            if (res.data.list.length !== 0) {
              // this.list = this.list.concat(res.data.list);
              this.more = res.data.list;
            }else {
              this.more = [];
            }
          }
          this.lock = false;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.wrapper, {
              scrollY: true,
              click: true,
              startY: 0,
              pullUpLoad: {
                // 当上拉距离超过50px时触发 pullingUp 事件
                threshold: -50
              }
            });
            if (!this.more.length) {
              this.scroll.on("pullingUp", () => {
                this.page++;
                console.log(this.page);
                this.tobeEvaluated(this.page);
              });
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    //已评价
    async alreadyEvaluated(page) {
      try {
        let res = await this.$api.alreadyEvaluated(page);
        if (res.code === 200) {
          if (page === 1) {
            this.finishList = res.data.list;
          } else {
            if (res.data.finishList.length !== 0) {
              // this.finishList = finishList.list.concat(res.data.list);
              this.more = res.data.list;
            }else {
              this.more = [];
            }
          }
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.wrapper, {
              scrollY: (this.page - 1) * 100,
              click: true,
              startY: 0,
              pullUpLoad: {
                // 当上拉距离超过50px时触发 pullingUp 事件
                threshold: -50
              }
            });
            if (!this.more.length) {
              this.scroll.on("pullingUp", () => {
                this.page++;
                this.tobeEvaluated(this.page);
              });
            }
          });
          // this.scroll.finishPullUp();
        }
      } catch (e) {
        console.log(e);
      }
    },
    //平滑滚动
    roll() {
      this.page = 1;
      this.alreadyEvaluated(this.page);
    },
    //立即评价
    skip(path, item) {
      this.$router.push({ name: path, query: { data: item } });
    },
    //前往详情
    goDetails(item) {
      this.$router.push({ name: "productDetails", query: { id: item } });
    }
  },
  mounted() {
    this.tobeEvaluated(this.page);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.loading {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  text-align: center;
  line-height: 100vh;
  background: white;
}
.title {
  position: relative;
  img {
    display: block;
  }
  .evaluate {
    width: 86%;
    position: absolute;
    left: 7%;
    bottom: -30px;
    box-shadow: 2px 2px 3px rgba(128, 121, 123, 0.59);
    border-radius: 5px;
  }
}
.fill {
  height: 30px;
  background: white;
}
.foot {
  position: fixed;
  top: 245px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .goods {
    padding: 15px;
    display: flex;
    background: white;
    border-bottom: 1px solid rgba(128, 121, 123, 0.57);
    position: relative;
    .img {
      width: 70px;
      height: 70px;
      img {
        display: block;
      }
    }
    .but {
      flex: 1;
      position: absolute;
      right: 15px;
      bottom: 15px;
      color: red;
      display: flex;
      width: 90px;
      border: 1px solid red;
      padding: 5px;
      border-radius: 30px;
      font-size: 14px;
      .icon {
        margin-left: 5px;
        margin-right: 10px;
      }
    }
    .but1 {
      color: black;
      border: 1px solid black;
    }
    .word {
      padding-left: 20px;
    }
  }
}
.noOrder {
  text-align: center;
  margin-top: 150px;
  font-size: 30px;
  color: red;
}
</style>
