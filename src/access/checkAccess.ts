import ACCESS_ENUM from "@/access/accessEnum";
import { nextTick } from "vue";

/**
 *  权限检查
 * @param loginUser 当前登录用户
 * @param needAccess 需要检查的权限
 * @returns boolean 是否有权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  //获取当前登录用户具有的权限
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  //如果需要登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    //如果用户没登录，表示没权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  //如果需要管理员才能访问
  if (needAccess === ACCESS_ENUM.ADMIN) {
    //如果用户没登录，表示没权限
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
    return true;
  }
};
export default checkAccess;
