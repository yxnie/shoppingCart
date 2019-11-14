<template>
  <div>
    <div class="All">
      <div class="title">
        <van-icon name="paid" size="30px" />
        <div>待付款</div>
      </div>
      <div class="title">
        <van-icon name="send-gift-o" size="30px" />
        <div>待发货</div>
      </div>
      <div class="title">
        <van-icon name="logistics" size="30px" />
        <div>待收货</div>
      </div>
      <div class="title" @click="skip('/assessmentCenter')">
        <van-icon name="thumb-circle-o" size="30px" :info="length" v-if="length"/>
        <van-icon name="thumb-circle-o" size="30px" v-else/>
        <div>评价</div>
      </div>
      <div class="title" @click="skip('/finishOrder')">
        <van-icon name="after-sale" size="30px" />
        <div>已完成</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bar",
  components: {},
  props: {},
  data() {
    return {
      length: null
    };
  },
  methods: {
    skip(path) {
      this.$router.push(path);
    },
    //待评价
    async tobeEvaluated() {
      try {
        let res = await this.$api.tobeEvaluated();
        if (res.code === 200) {
          this.length = res.data.list.length;
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.tobeEvaluated();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.All {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  .title {
    flex: 1;
    text-align: center;
  }
}
</style>
