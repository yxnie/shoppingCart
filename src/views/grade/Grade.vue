<template>
  <div>
    <top>
      评价中心
    </top>
    <div class="head">
      <div class="img"><img :src="data.image_path" alt="" /></div>
      <div class="word">
        <div>商品评分</div>
        <div class="name">
          <van-rate
            v-model="value"
            :size="25"
            color="#ee0a24"
            void-icon="star"
            void-color="#eee"
          ></van-rate>
        </div>
      </div>
    </div>
    <div class="center">
      <textarea v-model="content" placeholder="说说你的购买感受吧"></textarea>
    </div>
    <div class="upImg">
      <van-uploader v-model="fileList" multiple />
    </div>
    <div class="foot">
      <div class="anonymous" @click="isAnonymous">
      <span class="cycle">
        <van-icon name="success" v-if="anonymous"/>
      </span>
        匿名评价
      </div>
      <div class="but"><van-button type="primary" size="large" @click="submit">提交</van-button></div>
    </div>
  </div>
</template>

<script>
import top from "../../components/public/Top";
export default {
  name: "Grade",
  components: {
    top
  },
  props: {},
  data() {
    return {
      value: 5, //星数
      data: {}, //接收数据
      content: "", //文本域评价内容
      fileList: [], //图片上传
      anonymous: false, //是否匿名
    };
  },
  methods: {
    isAnonymous() {
      this.anonymous = !this.anonymous;
    },
    //提交评价
    async submit() {
      let arr = {};
      arr._id = this.data._id;
      arr.id = this.data.cid;
      arr.anonymous = this.anonymous;
      arr.order_id = this.data.order_id;
      arr.image = [];
      arr.content = this.content;
      arr.rate = this.value;
      try {
        let res = await this.$api.comment(arr);
        if (res.code === 200) {
          this.$toast(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
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
.head {
  display: flex;
  margin-top: 50px;
  background: white;
  padding: 5px 15px;
  .img {
    width: 80px;
    height: 80px;
    img {
      display: block;
    }
  }
  .word {
    margin-left: 30px;
    .name {
      margin-top: 20px;
    }
  }
}
.center {
  button,input,textarea {
    color: inherit;
    font: inherit;
    width: 94%;
    border: 0;
    background: #f2f2f2;
    height: 150px;
    padding: 3%;
  }
}
.upImg {
  padding-left: 15px;
}
.anonymous {
  padding-left: 15px;
  line-height: 21px;
  .cycle {
    width: 16px;
    height: 16px;
    border: 1px solid #333;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    top: 2px;
    margin-right: 6px;
  }
}
.but {
  padding: 15px;
}
.foot {
  position: fixed;
  top: 400px;
  bottom: 0;
  background: white;
  width: 100%;
}
</style>
