import { boot } from "quasar/wrappers";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var csrfToken = getCookie("csrftoken");

const api = axios.create({
  baseURL: "https://alaatv.com/api/v2/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function setToken(token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

function removeToken() {
  delete api.defaults.headers["Authorization"];
}

function setCSRF() {
  api.defaults.headers["X-CSRFToken"] = getCookie("csrftoken");
  console.log(getCookie("csrftoken"));
}

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, setToken, removeToken, setCSRF };
