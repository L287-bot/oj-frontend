//@ 是 Webpack 或某些构建工具（例如 Vue CLI）为路径别名（alias）设置的快捷方式，通常代表项目根目录（src 目录）。
import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

/**
 * 编写所有的校验逻辑
 */

router.beforeEach(async (to, from, next) => {
  // 获取当前登录用户
  const loginUser = store.state.user.loginUser;
  // 获取当前页面的访问权限
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  //如果之前没有过登录的就自动登录，自动获取登录用户 1.登录成功2.登录失败，后面会重定向到登录页
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
  }
  //如果要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    //如果没有登录，跳转到登录页面
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    //登录了但是权限不足
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
