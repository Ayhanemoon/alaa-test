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
    setToken(data.access_token);
    commit("setUser", data);
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
