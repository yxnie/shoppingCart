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
        component: Home,
        meta: {
          title: "首页"
        }
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
        component: () => import("../views/classify/Classify.vue"),
        meta: {
          title: "分类"
        }
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
        component: () => import("../views/shoppingCart/ShoppingCart.vue"),
        meta: {
          title: "购物车"
        }
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
        component: () => import("../views/userPage/UserPage.vue"),
        meta: {
          title: "用户中心"
        }
      }
    ]
  },
  // 登录，注册
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login.vue"),
    meta: {
      title: "登录，注册"
    }
  },
  // 定位
  {
    path: "/location",
    name: "location",
    component: () => import("../views/location/Location.vue"),
    meta: {
      title: "定位"
    }
  },
  // 地址列表
  {
    path: "/addressList",
    name: "addressList",
    component: () => import("../views/addressList/AddressList.vue"),
    meta: {
      title: "地址列表"
    }
  },
  // 编辑地址
  {
    path: "/editAddress",
    name: "editAddress",
    component: () => import("../views/editAddress/EditAddress.vue"),
    meta: {
      title: "编辑地址"
    }
  },
  // 订单结算
  {
    path: "/settleAccounts",
    name: "settleAccounts",
    component: () => import("../views/settleAccounts/SettleAccounts.vue"),
    meta: {
      title: "订单结算"
    }
  },
  // 商品详情
  {
    path: "/productDetails",
    name: "productDetails",
    component: () => import("../views/productDetails/ProductDetails.vue"),
    meta: {
      title: "商品详情"
    }
  },
  // 评价中心
  {
    path: "/assessmentCenter",
    name: "assessmentCenter",
    component: () => import("../views/assessmentCenter/AssessmentCenter.vue"),
    meta: {
      title: "评价中心"
    }
  },
  // 评价详情
  {
    path: "/evaluationDetails",
    name: "evaluationDetails",
    component: () => import("../views/evaluationDetails/EvaluationDetails.vue"),
    meta: {
      title: "评价详情"
    }
  },
  // 评分
  {
    path: "/grade",
    name: "grade",
    component: () => import("../views/grade/Grade.vue"),
    meta: {
      title: "评分"
    }
  },
  // 我的订单
  {
    path: "/myOrder",
    name: "myOrder",
    component: () => import("../views/myOrder/MyOrder.vue"),
    meta: {
      title: "我的订单"
    }
  },
  // 完成订单
  {
    path: "/finishOrder",
    name: "finishOrder",
    component: () => import("../views/finishOrder/FinishOrder.vue"),
    meta: {
      title: "完成订单"
    }
  },
  // 我的收藏
  {
    path: "/collect",
    name: "collect",
    component: () => import("../views/collect/Collect.vue"),
    meta: {
      title: "我的收藏"
    }
  },
  // 最近浏览
  {
    path: "/latelyLook",
    name: "latelyLook",
    component: () => import("../views/latelyLook/LatelyLook.vue"),
    meta: {
      title: "最近浏览"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
