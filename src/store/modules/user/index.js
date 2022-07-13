import { api, removeToken, setToken } from "src/boot/axios";
import { SessionStorage, LocalStorage, Cookies } from "quasar";

const state = {
  user: {
    user: {
      id: 0,
      mobile: "",
      mobile_verified_at: null,
      first_name: null,
      last_name: null,
      national_code: "",
      photo: "",
      province: null,
      city: null,
      address: null,
      school: null,
      major: {
        id: 0,
        name: "",
        title: "",
      },
      grade: {
        id: 0,
        name: "",
        title: "",
      },
      gender: {
        id: 0,
        name: "",
        title: "",
      },
      shahr: {
        id: 0,
        title: "",
        province: {
          id: 0,
          title: "",
        },
      },
    },
    redirectTo: "",
    access_token: "",
    token_type: "",
    token_expires_at: "",
  },
};

const getters = {
  user: (state) => state.user,
};

const mutations = {
  setUser: (state, user) => (state.user = user),
};

const actions = {
  async login({ commit }, { mobile, password }) {
    const response = await api.post("login", { mobile, password });
    const { data } = response;
    setToken(data.data.access_token);
    SessionStorage.set("userData", JSON.stringify(data.data));
    SessionStorage.set("Authenticated", true);

    LocalStorage.set("userData", JSON.stringify(data.data));
    LocalStorage.set("Authenticated", true);

    let cookie = {
      userData: data.data,
      Authenticated: true,
    };
    Cookies.set("alaa", JSON.stringify(cookie), {
      expires: "1d",
      path: "/",
      sameSite: "Strict",
    });
    commit("setUser", data.data);
  },

  async logout({ commit }) {
    SessionStorage.remove("userData");
    SessionStorage.remove("Authenticated");
    LocalStorage.remove("userData");
    LocalStorage.remove("Authenticated");
    Cookies.remove("alaa", { path: "/" });
    commit("setUser", {});
  },

  async get({ commit }) {
    const user =
      SessionStorage.getItem("userData") || LocalStorage.getItem("userData");
    if (user) {
      commit("setUser", JSON.parse(user));
    }
  },
};

const modules = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules,
};
