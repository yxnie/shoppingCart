<template>
  <div>
    <keep-alive>
    <router-view />
    </keep-alive>
    <van-tabbar v-model="active" active-color="#ff5700">
      <van-tabbar-item icon="wap-home-o" @click="skip('/')"
        >商城</van-tabbar-item
      >
      <van-tabbar-item icon="wap-nav" @click="skipClassify"
        >分类</van-tabbar-item
      >
      <van-tabbar-item icon="shopping-cart" @click="skip('/shoppingCart')"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" @click="skip('/userPage')"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Frame",
  components: {},
  props: {},
  data() {
    return {
      active: 0
    };
  },
  methods: {
    skip(path) {
      this.$router.push(path);
    },
    skipClassify(){
      this.$router.push({name:"classify",query:{categoryId:0}});
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
