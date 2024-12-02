import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  actions: {
    //{ commit, state } 是从这个上下文对象中解构出来的
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        //通过 commit 提交一个 mutation，调用 Vuex 的 updateUser mutation，将从 API 返回的 res.data（用户数据）传递给它。
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    //mutation 函数会自动接收一个特殊的第一个参数，通常被命名为 state，它代表了当前模块的状态对象。Vuex 会自动将 state 作为第一个参数传递给 mutation。
    //payload 的结构取决于action传递给该 mutation 的数据内容。
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
