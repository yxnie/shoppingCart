import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Frame from "../views/Frame.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  //首页
  {
    path: "/home",
    component: Frame,
    children: [
      {
        path: "",
        name: "home",
        component: Home
      }
    ]
  },
  // 分类
  {
    path: "/classify",
    component: Frame,
    children: [
      {
        path: "",
        name: "classify",
        component: () => import("../views/classify/Classify.vue")
      }
    ]
  },
  // 购物车
  {
    path: "/shoppingCart",
    component: Frame,
    children: [
      {
        path: "",
        name: "shoppingCart",
        component: () => import("../views/shoppingCart/ShoppingCart.vue")
      }
    ]
  },
  // 用户
  {
    path: "/userPage",
    component: Frame,
    children: [
      {
        path: "",
        name: "userPage",
        component: () => import("../views/userPage/UserPage.vue")
      }
    ]
  },
  // 登录，注册
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login.vue")
  },
  // 定位
  {
    path: "/location",
    name: "location",
    component: () => import("../views/location/Location.vue")
  },
  // 地址列表
  {
    path: "/addressList",
    name: "addressList",
    component: () => import("../views/addressList/AddressList.vue")
  },
  // 编辑地址
  {
    path: "/editAddress",
    name: "editAddress",
    component: () => import("../views/editAddress/EditAddress.vue")
  },
  // 订单结算
  {
    path: "/settleAccounts",
    name: "settleAccounts",
    component: () => import("../views/settleAccounts/SettleAccounts.vue")
  },
  // 商品详情
  {
    path: "/productDetails",
    name: "productDetails",
    component: () => import("../views/productDetails/ProductDetails.vue")
  },
  // 评价中心
  {
    path: "/assessmentCenter",
    name: "assessmentCenter",
    component: () => import("../views/assessmentCenter/AssessmentCenter.vue")
  },
  // 评价详情
  {
    path: "/evaluationDetails",
    name: "evaluationDetails",
    component: () => import("../views/evaluationDetails/EvaluationDetails.vue")
  },
  // 评分
  {
    path: "/grade",
    name: "grade",
    component: () => import("../views/grade/Grade.vue")
  },
  // 我的订单
  {
    path: "/myOrder",
    name: "myOrder",
    component: () => import("../views/myOrder/MyOrder.vue")
  },
  // 完成订单
  {
    path: "/finishOrder",
    name: "finishOrder",
    component: () => import("../views/finishOrder/FinishOrder.vue")
  },
  // 我的收藏
  {
    path: "/collect",
    name: "collect",
    component: () => import("../views/collect/Collect.vue")
  },
  // 最近浏览
  {
    path: "/latelyLook",
    name: "latelyLook",
    component: () => import("../views/latelyLook/LatelyLook.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
