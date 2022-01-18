import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async getUser(context) {
      try {
        const {data: {user}} = await axios.get(`/auth/user`)
        context.commit("setUser", user)
        console.log(context.state)
      } catch (e) {
        this.$bvToast.toast(e.response.data.message, {
          title: "Ошибка",
          variant: "danger",
          solid: true,
          autoHideDelay: 5000,
        })
      }
    }
  },
  modules: {
  }
})
