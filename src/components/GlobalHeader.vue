<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/oj-logo.svg" />
            <div class="title">SZU OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

const store = useStore();
const loginUser = store.state.user?.loginUser;
//获取路由器实例通过 useRouter，你可以在组件中访问路由器的各种方法，如导航方法 push、replace 等。
const router = useRouter();
// //通过 useRoute，你可以访问当前路由的各种属性，如路径、查询参数、路由参数等。
// const route = useRoute();
//路由跳转时，更新选中的菜单项[高亮设置]
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (
      //拿到登录用户，以及当前路由的权限，判断用户是否有权限访问该路由，没有权限的隐藏
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// } routes.filter((item, index) => {
//   if (item.meta?.hideInMenu) {
//     return false;
//   }
//   //todo 根据权限过滤菜单
//   if (checkAccess(loginUser, item.meta?.access as string)) {
//     return false;
//   }
//   return true;
// });
//默认主页
const selectedKeys = ref(["/"]);
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "我是懒大王",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 4000);
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
