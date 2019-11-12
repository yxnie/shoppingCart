<template>
  <div>
    <div class="icon">
      <van-icon name="setting-o" color="white" @click="showPopup" />
    </div>
    <van-popup
      v-model="show"
      position="right"
      :style="{ width: '100%', height: '100%' }"
      get-container="body"
    >
      <div>
        <top>
          <div slot="back"></div>
          个人资料
        </top>
        <div class="back" @click="shut">
          <van-icon name="arrow-left" size="30px" color="#5649fb" />
        </div>
        <div class="content" v-if="data">
          <div>
            <van-field label="github" v-model="github" placeholder="" />
          </div>
          <div class="head">
            <div class="arrow"><van-icon name="arrow" /></div>
            <div>头像</div>
            <img :src="data.avatar" alt="" class="img">
          </div>
          <div class="single">
            <van-field
              label="用户名"
              v-model="data.username"
              placeholder="请输入用户名"
            ></van-field>
          </div>
          <div class="single">
            <van-field
              label="昵称"
              v-model="data.nickname"
              placeholder="请输入昵称"
            ></van-field>
          </div>
          <div class="single">
            <van-field
              label="性别"
              v-model="data.gender"
              placeholder="请输入性别"
            ></van-field>
          </div>
          <div class="single">
            <van-field
              label="邮箱"
              v-model="email"
              placeholder="请输入邮箱"
            ></van-field>
          </div>
          <div>
            <van-field
              label="出生年月"
              disabled
              :value="showBirthday"
              placeholder="请输入出生年月"
              @click="checkTime"
            ></van-field>
          </div>
          <van-popup
            v-model="checkBirthday"
            position="bottom"
            :style="{ height: '40%' }"
          >
            <div v-if="birthday">
              <van-datetime-picker
                v-model="birthday"
                type="date"
                :min-date="minTime"
                :max-date="now"
                :formatter="formatter"
                @confirm="verify"
                @cancel="revocation"
              ></van-datetime-picker>
            </div>
          </van-popup>
          <div class="single but">
            <van-button type="primary" size="large" @click="save">保存</van-button>
            <van-button size="large" class="cancel" @click="cancel">取消</van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import top from "../../components/public/Top";
export default {
  name: "Settings",
  components: {
    top
  },
  props: {},
  data() {
    return {
      show: false,
      github: "",
      email: "",
      now: new Date(),
      birthday: null,
      minTime: new Date(1919, 0, 1),
      checkBirthday: false,
      showBirthday: null,
      id: ""
    };
  },
  methods: {
    //用户接口
    async user() {
      try {
        let res = await this.$api.user();
        if (res.code !== -1) {
          this.id = res.userInfo._id;
        }
      } catch (e) {
        console.log(e);
      }
    },
    //打开设置信息页面
    showPopup() {
      this.show = true;
      this.birthday = this.$dayjs().year(this.data.year).month(this.data.month).date(this.data.day);
      this.showBirthday = this.$dayjs(this.birthday).format("YYYY年MM月DD日");
    },
    //关闭设置信息页面
    shut() {
      this.show = false;
    },
    //过滤时间选择器
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    //打开时间选择器
    checkTime() {
      this.checkBirthday = true;
    },
    //确认选择生日时间
    verify(val) {
      this.showBirthday = this.$dayjs(val).format("YYYY年MM月DD日");
      this.checkBirthday = false;
    },
    //取消选择生日时间
    revocation() {
      this.checkBirthday = false;
    },
    //保存信息接口
    async saveUser(val) {
      try {
        let res = await this.$api.saveUser(val);
        if (res.code === 200) {
          this.$toast(res.msg);
          this.$store.state.user = res.user; //用户存入store
          localStorage.setItem("name", JSON.stringify(res.user)); //用户存入localstorage
        }
      } catch (e) {
        console.log(e);
      }
    },
    //保存修改
    save() {
      let user = {};
      user.year = this.$dayjs(this.birthday).year();
      user.month = this.$dayjs(this.birthday).month();
      user.day = this.$dayjs(this.birthday).date();
      user.gender = this.data.gender;
      user.nickname = this.data.nickname;
      user.id = this.id;
      this.saveUser(user);
    },
    //取消修改
    cancel() {
      this.show = false;
    }
  },
  mounted() {
    this.user();
  },
  created() {},
  filters: {},
  computed: {
    data() {
      return this.$store.state.user;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.icon {
  font-size: 25px;
  position: absolute;
  top: 15px;
  right: 15px;
}
.back {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 99;
}
.content {
  margin-top: 51px;
}
.single {
  margin: 10px 0;
}
.but {
  margin-top: 50px;
  padding: 0 40px;
}
.cancel {
  margin-top: 10px;
  border: 1px solid rgba(113, 114, 108, 0.8);
}
.head {
  height: 80px;
  display: flex;
  position: relative;
  justify-content: space-between;
  padding: 0 16px;
  line-height: 80px;
  .img {
    display: block;
    border-radius: 50%;
    height: 80px;
    width: 80px;
    margin-right: 10px;
  }
  .arrow {
    position: absolute;
    right: 10px;
    font-size: 25px;
  }
}

</style>
