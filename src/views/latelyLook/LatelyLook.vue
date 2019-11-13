<template>
  <div>
    <top>
      最近浏览
    </top>
    <div class="all" ref="wrapper">
      <div v-if="data.length > 0">
        <div v-for="(item, index) in data" :key="index" class="goods">
          <div class="img" @click="skip(item)">
            <img :src="item.image_path" alt="" />
          </div>
          <div class="word">
            <div class="name" @click="skip(item)">{{ item.name }}</div>
            <div class="price" @click="skip(item)">
              ￥{{ item.present_price }} <s class="old">{{item.orl_price}}</s>
            </div>
          </div>
          <div class="cross" @click="remove(index)">
            <van-icon name="cross" size="12px" />
          </div>
        </div>
      </div>
      <div v-else class="noLook">暂无最近浏览</div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import top from "../../components/public/Top";
export default {
  name: "LatelyLook",
  components: {
    top
  },
  props: {},
  data() {
    return {
      RecentView: "", //最近浏览
      data: []
    };
  },
  methods: {
    skip(item) {
      this.$router.push({ name: "productDetails", query: { id: item.id } });
    },
    remove(index) {
      this.data.splice(index, 1);
      localStorage.setItem(this.RecentView, JSON.stringify(this.data));
    }
  },
  mounted() {
    if (localStorage.getItem("name")) {
      this.RecentView = `${
        JSON.parse(localStorage.getItem("name")).nickname
      }.RecentView`;
    } else {
      this.RecentView = "visitor.RecentView";
    }
    this.data = JSON.parse(localStorage.getItem(this.RecentView));
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        startY: 0
      });
    });
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
      font-size: 16px;
      margin-top: 20px;
      .old {
        color: #443e40;
        font-size: 7px;
        font-weight: normal;
        margin-left: 5px;
      }
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
.noLook {
  text-align: center;
  padding-top: 100px;
}
</style>
