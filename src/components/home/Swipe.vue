<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in slides" :key="index"
        ><img :src="item.image" alt="" @click="skip(item)"
      /></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Swipe",
  components: {},
  props: {
    slides: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    skip(item) {
      this.$router.push({
        name: "productDetails",
        query: { id: item.goodsId }
      });
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

<style scoped lang="scss"></style>
