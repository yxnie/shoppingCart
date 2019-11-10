<template>
  <div>
    <top>
      地址列表
    </top>
    <div class="foot">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
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
      chosenAddressId: null,
      list: []
    };
  },
  methods: {
    //获取地址数据
    async getAddress() {
      try {
        let res = await this.$api.getAddress();
        if (res.code === 200) {
          res.address.map((item, index) => {
            if (item.isDefault) {
              this.chosenAddressId = index;
            }
            item.id = index;
          });
          let obj = res.address.splice(this.chosenAddressId, 1);
          res.address.unshift(obj[0]);
          this.list = res.address;
        }
      } catch (e) {
        console.log(e);
      }
    },
    //添加地址
    onAdd() {
      this.$router.push("/editAddress");
    },
    //编辑地址
    onEdit(item) {
      this.$router.push({ name: "editAddress", query: { info: item } });
    },
    //修改默认地址
    async select(item) {
      try {
        let res = await this.$api.setDefaultAddress(item._id);
        if (res.code === 200) {
          this.$toast(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
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
