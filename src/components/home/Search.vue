<template>
  <div>
    <div class="top">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        background="#F7F8FA"
        class="input"
      >
      </van-search>
      <div slot="action" @click="onSearch" class="word">搜索</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  components: {},
  props: {},
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onSearch() {}
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
  justify-content: center;
  .word {
    margin-left: 15px;
  }
  .input {
    height: 35px;
  }
}
</style>
