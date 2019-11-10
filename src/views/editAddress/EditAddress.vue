<template>
  <div>
    <top>
      地址列表
    </top>
    <div class="foot">
      <van-address-edit
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :address-info="info"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import areaList from "../../assets/commonality/area";
import top from "../../components/public/Top";
export default {
  name: "EditAddress",
  components: {
    top
  },
  props: {},
  data() {
    return {
      areaList,
      info: {}
    };
  },
  methods: {
    //添加，修改地址
    async onSave(form) {
      let address =
        form.province + form.city + form.county + form.addressDetail;
      form.address = address;
      if (!this.info) {
        console.log("添加");
      } else {
        form.id = this.info._id;
      }
      try {
        let res = await this.$api.postAddress(form);
        if (res.code === 200) {
          this.$toast(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //添加地址
    async onDelete(form) {
      try {
        let res = await this.$api.deleteAddress(form._id);
        if (res.code === 200) {
          this.$toast(res.msg);
        } else if (res.code === 200) {
          this.$toast(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.info = this.$route.query.info; //接收编辑地址信息
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
