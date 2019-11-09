<template>
  <div>
    <top>
      地址列表
    </top>
    <div class="foot">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        disabled-text="以下地址超出配送范围"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import top from "../../components/public/Top";
export default {
  name: "AddressList",
  components: {
    top
  },
  props: {},
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        }
      ],
      address: []
    };
  },
  methods: {
    async getAddress() {
      try {
        let res = await this.$api.getAddress();
        console.log(res,3);
        if (res.code === 200) {
          res.address;
          this.list=res.address.map((item,index) => {
            console.log(item, index);
          })
        }
      } catch (e) {
        console.log(e);
      }
    },
    onAdd() {
      this.$router.push("/editAddress");
    },

    onEdit(item, index) {
      this.$toast("编辑地址:" + index);
    }
  },
  mounted() {
    this.getAddress();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.foot {
  margin-top: 50px;
}
</style>
