<template>
  <div>
    <van-loading
      v-if="lock1"
      type="spinner"
      color="#1989fa"
      class="loading"
      size="50px"
    />
    <div v-else>
      <div class="top">
        <div class="place">
          <span v-if="city"  @click="skip('/location')"
            >{{ city }}<img src="../assets/images/down.svg" alt="" class="img"
          /></span>
          <span v-else
            ><van-loading size="24px" color="#1989fa">定位中</van-loading></span
          >
        </div>
        <div class="search">
          <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            @input="onInput"
            @focus="onFocus"
            background="#F7F8FA"
            class="input"
            @keydown.enter="onSearch"
          >
          </van-search>
          <div class="word" v-if="!lock" @click="cancel">取消</div>
        </div>
      </div>
      <div class="home" ref="wrapper">
        <div v-if="lock">
          <swipe :slides="data.slides"></swipe>
          <div class="category">
            <div
              v-for="(item, index) in data.category"
              :key="index"
              class="desc"
            >
              <div class="con">
                <img :src="item.image" alt="" @click="goClassify(index)" />
                <div class="word">{{ item.mallCategoryName }}</div>
              </div>
            </div>
          </div>
          <div v-if="data.advertesPicture">
            <img :src="data.advertesPicture.PICTURE_ADDRESS" alt="" />
          </div>
          <recommend :recommend="data.recommend"></recommend>
          <div class="title">
            <div class="num">1F</div>
            <div class="floorName" v-if="data.floorName">
              {{ data.floorName.floor1 }}
            </div>
          </div>
          <floor :floor="data.floor1"></floor>
          <div class="title">
            <div class="num">2F</div>
            <div class="floorName" v-if="data.floorName">
              {{ data.floorName.floor2 }}
            </div>
          </div>
          <floor :floor="data.floor2"></floor>
          <div class="title">
            <div class="num">3F</div>
            <div class="floorName" v-if="data.floorName">
              {{ data.floorName.floor3 }}
            </div>
          </div>
          <floor :floor="data.floor3"></floor>
          <div class="title font">热销商品</div>
          <hotGoods :hot="data.hotGoods"></hotGoods>
        </div>
        <div v-else-if="!lock && value.trim()">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="goods"
            @click="goSearch(item)"
          >
            <div class="img">
              <div class="pic"><img :src="item.image" alt="" /></div>
            </div>
            <div class="word">
              <div class="name" v-html="item.name"></div>
              <div class="price">
                <span class="now">￥{{ item.present_price }}</span
                ><span class="old"
                  ><s>￥{{ item.orl_price }}</s></span
                >
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="history">
            <div class="searchTitle">
              <div class="word">搜索历史</div>
              <div class="icon" @click="removeHistories">
                <van-icon name="delete" />
              </div>
            </div>
            <div class="allHistory">
              <div
                v-for="(item, index) in history"
                :key="index"
                class="history"
              >
                <div class="icon" @click="removeHistory(index)">
                  <van-icon name="cross" />
                </div>
                <div>
                  <van-tag plain round size="large" @click="goHistory(item)">{{
                    item
                  }}</van-tag>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="noSearch">暂无搜索历史</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swipe from "../components/home/Swipe";
import recommend from "../components/home/Recommend";
import floor from "../components/home/Floor";
import hotGoods from "../components/home/HotGoods";
import BScroll from "better-scroll";
export default {
  name: "Home",
  components: {
    swipe,
    recommend,
    floor,
    hotGoods
  },
  props: {},
  data() {
    return {
      city: "",
      data: {}, //首页数据
      value: "", //搜索值
      lock: true, //搜索页面开关
      list: [], //搜索数据
      nameId: "", //用户id
      history: null, //搜索历史
      lock1: true //加载
    };
  },
  methods: {
    //获取首页数据
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.data = res.data;
        this.$store.state.category = this.data.category;
        this.lock1 = false;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {
            scrollY: true,
            click: true,
            startY: 0
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
    //定位
    skip(path) {
      this.$router.push(path);
    },
    //跳转分类
    goClassify(index) {
      this.$router.push({ name: "classify", query: { categoryId: index } });
    },
    //搜索
    async onInput() {
      try {
        let res = await this.$api.search(this.value.trim());
        if (res.code === 200) {
          this.list = res.data.list;
          let val = this.value.trim();
          this.list.map(item => {
            let findText = item.name.split(val); //以查找关键字作为拆分成数组
            item.name = findText.join(
              '<span style="color:red;">' + val + "</span>"
            ); //在拆分的数组后加入span并转化成字符串
          });
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.wrapper, {
              scrollY: true,
              // click: true,
              startY: 0
            });
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    //搜索框获取焦点
    onFocus() {
      if (localStorage.getItem("name")) {
        this.nameId = `${
          JSON.parse(localStorage.getItem("name")).nickname
        }.SearchHistory`;
      } else {
        this.nameId = "visitor.SearchHistory";
      }
      this.history = JSON.parse(localStorage.getItem(this.nameId));
      this.lock = false;
    },
    //取消
    cancel() {
      this.value = "";
      this.lock = true;
    },
    //按下enter键
    onSearch() {
      if (!localStorage.getItem(this.nameId)) {
        let arr = [];
        arr.push(this.value);
        localStorage.setItem(this.nameId, JSON.stringify(arr)); //搜索历史存入localstorage
      } else {
        let arr = JSON.parse(localStorage.getItem(this.nameId));
        if (arr.indexOf(this.value) < 0) {
          arr.unshift(this.value);
          localStorage.setItem(this.nameId, JSON.stringify(arr)); //搜索历史存入localstorage
        }
      }
    },
    // 前往搜索内容详情页面
    goSearch(item) {
      this.onSearch();
      this.$router.push({
        name: "productDetails",
        query: { id: item.id }
      });
    },
    //移除单个搜索历史
    removeHistory(index) {
      this.history.splice(index, 1);
      localStorage.setItem(this.nameId, JSON.stringify(this.history)); //搜索历史存入localstorage
    },
    //点击搜索历史
    goHistory(item) {
      this.value = item;
    },
    //移除全部搜索历史
    removeHistories() {
      this.history = [];
      localStorage.setItem(this.nameId, JSON.stringify(this.history)); //搜索历史存入localstorage
    }
  },
  mounted() {
    this.recommend();
    this.city = this.$store.state.city;
    let _that = this;
    if (!this.city) {
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
    }
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.loading {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  text-align: center;
  line-height: 100vh;
  background: white;
}
.top {
  display: flex;
  padding: 5px;
  line-height: 35px;
  .place {
    margin: 0 10px;
    width: 80px;
    position: relative;
    .img {
      display: inline-block;
      position: absolute;
      top: 10px;
      margin-left: 5px;
      margin-right: 8px;
      width: 16px;
    }
  }
}
.search {
  flex: 1;
  display: flex;
  .word {
    margin-left: 15px;
  }
  .input {
    height: 35px;
    flex: 1;
  }
}
.noSearch {
  text-align: center;
  margin-top: 150px;
  font-size: 20px;
}
.home {
  position: fixed;
  width: 100%;
  top: 45px;
  bottom: 50px;
  overflow: hidden;
}
.category {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  background: white;
  padding: 5px;
  font-size: 14px;
  box-shadow: 2px 2px 10px rgba(106, 110, 103, 0.38);
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
.goods {
  padding: 5%;
  display: flex;
  background: white;
  font-size: 15px;
  color: black;
  width: 90%;
  .word {
    padding-left: 10px;
    position: relative;
    flex: 1;
    .name {
    }
    .price {
      position: absolute;
      bottom: 5px;
      .now {
        margin-right: 10px;
        font-weight: bold;
        color: red;
      }
      .old {
        color: #4e4e4e;
        font-size: 12px;
      }
    }
  }
  .img {
    border: 1px solid rgba(113, 114, 108, 0.5);
    .pic {
      width: 60px;
      img {
        display: block;
      }
    }
  }
}
.allHistory {
  display: flex;
  margin: 1%;
  flex-wrap: wrap;
  width: 98%;
  .history {
    position: relative;
    margin: 5px 8px;
    .icon {
      position: absolute;
      z-index: 100;
      top: -5px;
      right: -5px;
      font-size: 10px;
      width: 11px;
      height: 11px;
      border: 1px solid rgba(154, 147, 149, 0.44);
      color: rgba(154, 147, 149, 0.8);
      border-radius: 50%;
    }
  }
}
.searchTitle {
  display: flex;
  justify-content: space-between;
  margin: 15px;
  font-size: 17px;
}
</style>
