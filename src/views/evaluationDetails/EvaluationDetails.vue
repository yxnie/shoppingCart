<template>
  <div>
    <top>
      评价详情
    </top>
    <div class="all">
      <div class="head">
        <div class="img">
          <div v-if="avatar"><img :src="avatar" alt="" /></div>
          <div v-else>
            <img
                src="http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg"
                alt=""
            />
          </div>
        </div>
        <div>
          <div>
            {{name}}
          </div>
          <div class="rate">
            <van-rate
                v-model="data.rate"
                readonly
                :size="16"
                color="#ee0a24"
                void-icon="star"
                void-color="#eee"></van-rate>
          </div>
        </div>
        <div class="time">{{data.comment_time}}</div>
      </div>
      <div class="content">评价内容 : {{data.content}}</div>
      <div class="goods" v-if="data.goods">
        <div class="img"><img :src="data.goods[0].image_path" alt="" /></div>
        <div class="word">
          {{ data.goods[0].name }}
        </div>
        <div class="cart" @click="addShop(data.cid)">
          <van-icon name="shopping-cart-o" color="red"/>
        </div>
      </div>
      <div class="but"><van-button color="green" size="large" @click="back">返回</van-button></div>
    </div>
  </div>
</template>

<script>
import top from "../../components/public/Top";
export default {
  name: "EvaluationDetails",
  components: {
    top
  },
  props: {},
  data() {
    return {
      data: {},
      avatar: null,
      name: ""
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    async addShop(item) {
      try {
        let res = await this.$api.addShop(item);
        if (res.code === 200) {
          this.$toast(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.avatar = JSON.parse(localStorage.getItem("name")).avatar;
    this.name = JSON.parse(localStorage.getItem("name")).nickname;
    this.data = this.$route.query.data;
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
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
}
.head {
  margin-top: 50px;
  display: flex;
  padding: 15px;
  justify-content: space-between;
  .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    img {
      display: block;
      border-radius: 50%;
    }
  }
  .rate {
    margin-top: 20px;
  }
  .time {
    font-size: 15px;
    margin-top: 10px;
  }
}
.content {
  padding: 10px;
  border-bottom: 1px solid rgba(154,147,149,0.44);
}
.goods {
  padding: 15px;
  display: flex;
  position: relative;
  justify-content: space-between;
  .img {
    width: 70px;
    height: 70px;
    img {
      display: block;
    }
  }
  .cart {
    background: #ffe6e2;
    text-align: center;
    line-height: 45px;
    font-size: 23px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
}
.but {
  margin: 0 4%;
  width: 92%;
  position: absolute;
  bottom: 50px;
}
</style>
