import { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NoAuthView from "../views/NoAuthView.vue";
import UserLoginView from "../views/user/UserLoginView.vue";
import UserRegisterView from "../views/user/UserRegisterView.vue";
import UserLayout from "@/layouts/UserLayout.vue";

import { meta } from "@typescript-eslint/parser";
import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "浏览题目",
    component: HomeView,
  },
  {
    path: "/hide",
    name: "隐藏页面",
    component: HomeView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/admin",
    name: "仅限管理员",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AdminView.vue"),
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },

  {
    path: "/noAuth",
    name: "无权限默认页面",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/about",
    name: "关于我的",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
