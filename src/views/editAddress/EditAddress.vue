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
      areaList
    };
  },
  methods: {
    async onSave(form) {
      console.log(form,1);
      let address =
        form.province + form.city + form.county + form.addressDetail;
      form.address = address;
      try {
        let res = await this.$api.postAddress(form);
        console.log(res,2);
        if (res.code===200){
          this.$toast(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    onDelete() {
      this.$toast("delete");
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
.foot {
  margin-top: 50px;
}
</style>
