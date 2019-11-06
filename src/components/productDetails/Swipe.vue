<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in image" :key="index"
        ><img :src="item" alt=""
      /></van-swipe-item>
<!--      <div class="custom-indicator" slot="indicator">{{ current + 1 }}/4</div>-->
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Swipe.vue",
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // current: 0
    };
  },
  methods: {
    // onChange(index) {
    //   this.current = index;
    // }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {
    image() {
      let arr = [];
      arr.push(this.data.image);
      arr.push(this.data.image_path);
      return arr;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
img {
  display: block;
}
.custom-indicator {
  position: absolute;
}
</style>
