<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="首页" @click="onClickIcon('/')" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon('/shoppingCart')" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="onClickButton"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="onClickButton"
      />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: "GoodsAction",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    onClickIcon(path) {
      this.$router.push(path);
    },
    onClickButton() {
      console.log(2);
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
