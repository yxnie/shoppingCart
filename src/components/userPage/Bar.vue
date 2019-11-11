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
      <div class="title" @click="skip">
        <van-icon name="thumb-circle-o" size="30px" />
        <div>评价</div>
      </div>
      <div class="title">
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
    return {};
  },
  methods: {
    skip() {
      this.$router.push("/assessmentCenter");
    }
  },
  mounted() {},
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
