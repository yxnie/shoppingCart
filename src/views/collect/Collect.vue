<template>
  <div>
    <top>
      我的收藏
    </top>
    <div class="all" ref="wrapper">
      <div>
        <div
          v-for="(item, index) in data"
          :key="index"
          class="goods"
        >
          <div class="img" @click="skip(item)">
            <img :src="item.image_path" alt="" />
          </div>
          <div class="word">
            <div class="name" @click="skip(item)">{{ item.name }}</div>
            <div class="price" @click="skip(item)">￥{{ item.present_price }}</div>
          </div>
          <div class="cross" @click="remove(item, index)">
            <van-icon name="cross" size="12px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import top from "../../components/public/Top";
export default {
  name: "Collect",
  components: {
    top
  },
  props: {},
  data() {
    return {
      count: null, //我的收藏条数
      data: [] //收藏列表
    };
  },
  methods: {
    //查询收藏
    async getCollection() {
      try {
        let res = await this.$api.getCollection();
        if (res.code === 200) {
          this.count = res.data.count;
          this.data = res.data.list;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.wrapper, {
              scrollY: true,
              click: true,
              startY: 0
            });
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    //移除收藏
    async remove(item, index) {
      try {
        let res = await this.$api.cancelCollection(item.cid);
        if (res.code === 200) {
          this.$toast(res.msg);
          this.data.splice(index, 1);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //跳转收藏
    skip(item) {
      this.$router.push({name :"productDetails",query:{id:item.cid}})
    }
  },
  mounted() {
    this.getCollection();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.all {
  position: fixed;
  top: 50px;
  bottom: 0;
  background: white;
  width: 100%;
}
.goods {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  position: relative;
  .img {
    width: 80px;
    height: 80px;
    img {
      display: block;
    }
  }
  .word {
    flex: 1;
    margin-left: 15px;
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 16px;
      height: 20px;
    }
    .price {
      color: red;
      font-weight: bold;
      font-size: 15px;
      margin-top: 20px;
    }
  }
  .cross {
    width: 16px;
    height: 16px;
    position: absolute;
    text-align: center;
    right: 15px;
    bottom: 10px;
    border: 1px solid #7f7f7f;
    border-radius: 50%;
  }
}
</style>
