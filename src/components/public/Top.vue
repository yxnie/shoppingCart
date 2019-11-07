<template>
  <div class="top">
    <div class="back" @click="goBack">
      <slot name="back"><van-icon name="arrow-left"/></slot>
    </div>
    <div class="title">
      <slot>城市列表</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    //返回上一页面
    goBack() {
      this.$router.back();
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
  z-index: 10;
  .back {
    position: absolute;
    font-size: 30px;
    top: 5px;
    left: 10px;
  }
  .title {
    text-align: center;
  }
}
</style>
