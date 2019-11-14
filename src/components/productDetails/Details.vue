<template>
  <div>
    <van-tabs title-active-color="red">
      <van-tab title="商品详情"><div v-html="data.goodsOne.detail"></div></van-tab>
      <van-tab title="商品评价">
        <div v-if="data.comment">
          <div v-for="(item,index) in data.comment" :key="index">
            <div class="head">
              <div class="img" v-if="!item.anonymous">
                <div v-if="item.user[0]"><img :src="item.user[0].avatar" alt="" /></div>
              </div>
              <div v-else class="img">
                <img
                    src="http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg"
                    alt=""
                />
              </div>
              <div>
                <div v-if="!item.anonymous">
                  {{item.user[0].nickname}}
                </div>
                <div v-else>匿名用户</div>
                <div class="rate">
                  <van-rate
                      v-model="item.rate"
                      readonly
                      :size="16"
                      color="#ee0a24"
                      void-icon="star"
                      void-color="#eee"></van-rate>
                </div>
              </div>
              <div class="time">{{item.comment_time}}</div>
            </div>
            <div class="content">评价内容 : {{item.content}}</div>
          </div>
        </div>
        <div v-else>暂无评价</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "Details",
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
/deep/img {
  width: 100%;
}
.head {
  display: flex;
  padding: 15px;
  justify-content: space-between;
  .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    img {
      display: block;
      border-radius: 50%;
    }
  }
  .rate {
    margin-top: 20px;
  }
  .time {
    font-size: 15px;
    margin-top: 10px;
  }
}
.content {
  padding: 10px;
  border-bottom: 1px solid rgba(154,147,149,0.44);
}
</style>
