import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue, {BootstrapVueIcons} from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios";

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

export const serverUrl = "http://localhost:8080"
axios.defaults.baseURL = `${serverUrl}/api/v1`

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (403 === error.response.status) {
        localStorage.removeItem("token")
    } else {
        return Promise.reject(error);
    }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
