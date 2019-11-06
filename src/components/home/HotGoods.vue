<template>
  <div class="all">
    <div v-for="(item, index) in hot" :key="index" class="commodity">
      <img :src="item.image" alt="" />
      <div class="name">{{item.name}}</div>
      <div class="word"><span class="color">￥{{item.price}}</span><span><s class="mallPrice">￥{{item.mallPrice}}</s></span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotGoods",
  components: {},
  props: {
    hot: {
      type: Array,
      default: () => []
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
.all {
  display: flex;
  flex-wrap: wrap;
  .commodity {
    flex: 0 0 50%;
    text-align: center;
  }
}
.name {
  height: 15px;
  font-size: 15px;
  color: red;
  width: 170px;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.color {
  color: red;
}
.word {
  font-size: 18px;
  .mallPrice {
    color: #b6b6b6;
    font-size: 13px;
    margin-left: 8px;
  }
}
img {
  display: block;
}
</style>
