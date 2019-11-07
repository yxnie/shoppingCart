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
        <div class="content">
          <div>
            <van-field label="github" v-model="github" placeholder="" />
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
            <van-button type="primary" size="large">保存</van-button>
            <van-button size="large" class="cancel">取消</van-button>
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
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      github: "",
      email: "",
      now: new Date(),
      birthday: "",
      minTime: new Date(1919, 0, 1),
      checkBirthday: false,
      showBirthday: null
    };
  },
  methods: {
    //打开设置信息页面
    showPopup() {
      this.show = true;
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
    }
  },
  mounted() {
    this.birthday = this.$dayjs()
      .year(this.data.year)
      .month(this.data.month)
      .date(this.data.day);
    this.showBirthday = this.$dayjs(this.birthday).format("YYYY年MM月DD日");
  },
  created() {},
  filters: {},
  computed: {},
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
</style>
