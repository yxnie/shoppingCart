<template>
  <div>
    <div class="top">
      <div class="place" @click="skip('/location')">
        <span v-if="city"
          >{{ city }}<img src="../assets/images/down.svg" alt="" class="img"
        /></span>
        <span v-else
          ><van-loading size="24px" color="#1989fa">定位中</van-loading></span
        >
      </div>
      <search></search>
    </div>
    <swipe :slides="data.slides"></swipe>
    <div class="category">
      <div v-for="(item, index) in data.category" :key="index" class="desc">
        <div class="con">
          <img :src="item.image" alt="" />
          <div class="word">{{ item.mallCategoryName }}</div>
        </div>
      </div>
    </div>
    <div v-if="data.advertesPicture"><img :src="data.advertesPicture.PICTURE_ADDRESS" alt=""></div>
    <recommend :recommend="data.recommend"></recommend>
    <div class="title"><div class="num">1F</div><div class="floorName" v-if="data.floorName">{{data.floorName.floor1}}</div></div>
    <floor :floor="data.floor1"></floor>
    <div class="title"><div class="num">2F</div><div class="floorName" v-if="data.floorName">{{data.floorName.floor2}}</div></div>
    <floor :floor="data.floor2"></floor>
    <div class="title"><div class="num">3F</div><div class="floorName" v-if="data.floorName">{{data.floorName.floor3}}</div></div>
    <floor :floor="data.floor3"></floor>
    <div class="title font">热销商品</div>
    <hotGoods :hot="data.hotGoods"></hotGoods>
    <div class="foot"></div>
  </div>
</template>

<script>
import search from "../components/home/Search";
import swipe from "../components/home/Swipe";
import recommend from "../components/home/Recommend";
import floor from "../components/home/Floor";
import hotGoods from "../components/home/HotGoods";
export default {
  name: "Home",
  components: {
    search,
    swipe,
    recommend,
    floor,
    hotGoods
  },
  props: {},
  data() {
    return {
      city: "",
      data: {}
    };
  },
  methods: {
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.data = res.data;
        this.$store.state.category = this.data.category;
        console.log(this.data);
      } catch (e) {
        console.log(e);
      }
    },
    skip(path) {
      this.$router.push(path);
    }
  },
  mounted() {
    this.recommend();
    let _that = this;
    AMap.plugin("AMap.Geolocation", function() {
      let geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: "RB"
      });

      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);

      function onComplete(data) {
        // data是具体的定位信息
        _that.city = data.addressComponent.city;
        _that.$store.state.city = _that.city;
      }

      function onError(data) {
        // 定位出错
        console.log(data);
      }
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
.top {
  display: flex;
  padding: 5px;
  line-height: 35px;
  .place {
    margin: 0 10px;
    width: 77px;
    .img {
      display: inline-block;
      margin-left: 5px;
      margin-right: 8px;
      width: 16px;
    }
  }
}
.category {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  background: white;
  padding: 5px;
  font-size: 14px;
  box-shadow: 2px 2px 10px rgba(106,110,103,0.38);
  border-radius: 10px;
  .desc {
    flex: 1;
    .con {
      padding: 5px;
      img {
        width: 90%;
        padding: 5%;
      }
      .word {
        margin-top: 5px;
      }
    }
  }
}
.title {
  display: flex;
  width: 100%;
  justify-content: center;
  color: red;
  margin: 10px 0;
  .num {
    border-radius: 50%;
    background: red;
    color: white;
    padding: 3px;
  }
  .floorName {
    line-height: 22px;
    margin-left: 6px;
    font-size: 17px;
  }
}
.font {
  font-size: 17px;
}
.foot {
  height: 50px;
}
</style>
