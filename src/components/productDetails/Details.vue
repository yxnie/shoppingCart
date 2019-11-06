<template>
  <div>
    <van-tabs title-active-color="red">
      <van-tab title="商品详情"><div v-html="data.detail"></div></van-tab>
      <van-tab title="商品评价"><div>暂无评价</div></van-tab>
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
</style>
