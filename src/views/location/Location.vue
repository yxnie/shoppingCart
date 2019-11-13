<template>
  <div>
    <top>
      城市列表
    </top>
    <div class="in">
      <van-search
        placeholder="请输入城市关键词"
        v-model="value"
        class="input"
      />
    </div>
    <div class="allCity" ref="wrapper">
      <div>
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
              @click="choose(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
        <div v-if="searchCity.length === 0">
          <van-index-bar>
            <div v-for="(item, index) in keys" :key="index">
              <van-index-anchor :index="item" />
              <div v-for="(item1, index1) in cityList[index]" :key="index1">
                <van-cell :title="item1.name" @click="choose(item1.name)"/>
              </div>
            </div>
          </van-index-bar>
        </div>
        <div v-else>
          <div v-for="(item, index) in searchCity" :key="index">
            <div v-for="(item1, index1) in item" :key="index1">
              {{ item1.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import BScroll from "better-scroll";
import cities from "../../assets/commonality/city.js";
import top from "../../components/public/Top";
export default {
  name: "Location",
  components: {
    top
  },
  props: {},
  data() {
    return {
      value: "", //搜索的值
      cities: {}, //城市列表数据
      keys: [], //城市字母
      cityList: [], //城市列表
      showCity: {}, //展示数据
      searchCity: [] //搜索过滤后数据
    };
  },
  methods: {
    //选中城市
    choose(val) {
      this.$store.state.city = val;
      this.$router.push("/");
    }
  },
  mounted() {
    this.cities = cities;
    this.showCity = this.cities.data.cities; //获取展示数据
    this.keys = Object.keys(this.showCity); //获取城市字母
    this.cityList = Object.values(this.showCity); //获取城市列表
    // this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.wrapper, {
    //     scrollY: true,
    //     click: true,
    //     startY: 0
    //   });
    // });
  },
  created() {},
  filters: {},
  computed: {
    city() {
      return this.$store.state.city; //当前选择城市
    }
  },
  watch: {
    //监听搜索框输入并搜索
    value(val) {
      if (val.trim() !== "") {
        this.cityList.map(item => {
          this.searchCity.push(
            item.filter(item => {
              return JSON.stringify(item).includes(val);
            })
          );
        });
      } else {
        this.searchCity = [];
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.in {
  width: 96%;
  padding: 2%;
  position: fixed;
  top: 50px;
  background: white;
  z-index: 99;
  .input {
    height: 35px;
  }
}
.allCity {
  position: fixed;
  top: 110px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.search {
  margin: 10px;
  font-size: 17px;
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
