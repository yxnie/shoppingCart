<template>
  <div>
    <div class="top">
      <div class="back" @click="goBack"><van-icon name="arrow-left" /></div>
      <div class="title">城市列表</div>
    </div>
    <div class="search">
      <van-search
        placeholder="请输入城市关键词"
        v-model="value"
        class="input"
      />
    </div>
    <div class="search">当前城市</div>
    <div class="box now">
      <div class="city nowCity">{{ city }}</div>
    </div>
    <div class="search">热门城市</div>
    <div class="box1 box" v-if="cities.data">
      <div
        v-for="(item, index) in cities.data.hotCities"
        :key="index"
        class="city"
      >
        {{ item.name }}
      </div>
    </div>
    <div>
      <van-index-bar>
        <div v-for="(item, index) in keys" :key="index">
          <van-index-anchor :index="item" />
          <div v-for="(item1, index1) in cityList[index]" :key="index1">
            <van-cell :title="item1.name" />
          </div>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import cities from "../../assets/commonality/city.js";
export default {
  name: "Location",
  components: {},
  props: {},
  data() {
    return {
      value: "",
      cities: {},
      keys: [],
      cityList: []
    };
  },
  methods: {
    goBack() {
      this.$router.push("/home");
    }
  },
  mounted() {
    this.cities = cities;
    this.keys = Object.keys(this.cities.data.cities);
    this.cityList = Object.values(this.cities.data.cities);
    console.log(this.keys, 1);
    console.log(this.cityList, 2);
  },
  created() {},
  filters: {},
  computed: {
    city() {
      return this.$store.state.city;
    }
  },
  watch: {
    // value(val) {
    //   if (val.trim() === "") {
    //
    //   }else {
    //
    //   }
    // }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.top {
  position: relative;
  font-size: 19px;
  height: 50px;
  line-height: 50px;
  background: white;
  border-bottom: 1px solid rgba(119, 120, 114, 0.4);
  .back {
    position: absolute;
    font-size: 30px;
    top: 5px;
    left: 10px;
  }
  .title {
    text-align: center;
  }
}
.search {
  margin: 10px;
  font-size: 17px;
  .input {
    height: 35px;
  }
}
.now {
  padding-bottom: 10px !important;
  .nowCity {
    margin-bottom: 0 !important;
  }
}
.box {
  padding: 10px 0 0 10px;
  background: white;
  .city {
    padding: 6px;
    margin-bottom: 10px;
    margin-right: 10px;
    width: 25%;
    text-align: center;
    border: 1px solid #7d7e80;
  }
}
.box1 {
  display: flex;
  flex-wrap: wrap;
}
</style>
