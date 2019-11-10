<template>
  <div>
    <div class="top">
      <div class="desc" v-if="floor[0]"><img :src="floor[0].image" alt="" @click="skip(floor[0])"/></div>
      <div class="desc">
        <div v-for="(item, index) in floor.slice(1, 3)" :key="index">
          <div v-if="item">
            <img :src="item.image" alt="" @click="skip(item)" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div v-for="(item, index) in floor.slice(3)" :key="index" class="floor">
        <div v-if="item">
          <img :src="item.image" alt="" @click="skip(item)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Floor",
  components: {},
  props: {
    floor: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    skip(item) {
      this.$router.push({name :"productDetails",query:{id:item.goodsId}})
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
  display: flex;
  flex-wrap: wrap;
}
.desc {
  flex: 1;
}
.bottom {
  display: flex;
  .floor {
    flex: 1;
  }
}
img {
  display: block;
}
</style>
