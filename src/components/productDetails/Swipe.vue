<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in image" :key="index"
        ><img :src="item" alt="" @click="run"
      /></van-swipe-item>
    </van-swipe>
    <van-image-preview
        v-model="show"
        :images="image"
        @change="onChange"
    >
    </van-image-preview>
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
      show: false
    };
  },
  methods: {
    onChange(index) {
      this.index = index;
    },
    run() {
      this.show = true;
    }
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
