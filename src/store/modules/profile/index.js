import { api, removeToken, setToken, setCSRF } from "src/boot/axios";
import { SessionStorage, LocalStorage, Cookies } from "quasar";

const state = {
  options: {
    data: {
      provinces: [
        {
          id: 0,
          title: "",
        },
      ],
      cities: [
        {
          id: 0,
          title: "",
          province: {
            id: 0,
            title: "",
          },
        },
      ],
      majors: [
        {
          id: 0,
          name: "",
          title: "",
        },
      ],
      grades: [
        {
          id: 0,
          name: "",
          title: "",
        },
      ],
      genders: [
        {
          id: 0,
          name: "",
          title: "",
        },
      ],
    },
  },
};

const getters = {
  options: (state) => state.options,
  provinces: (state) => state.options.data.provinces,
  cities: (state) => state.options.data.cities,
  majors: (state) => state.options.data.majors,
  grades: (state) => state.options.data.grades,
  genders: (state) => state.options.data.genders,
};

const mutations = {
  setOptions: (state, options) => (state.options = options),
};

const actions = {
  async getOptions({ commit }) {
    let response = await api.get("megaroute/getUserFormData/");
    let { data } = response;
    commit("setOptions", data);
  },

  async update({ commit }, payload) {
    setCSRF();
    let token =
      SessionStorage.getItem("userData") || LocalStorage.getItem("userData");
    setToken(JSON.parse(token).access_token);
    let response = await api.put(`user/${payload.userId}`, payload.profile);
    let { data } = response;
    return data;
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
