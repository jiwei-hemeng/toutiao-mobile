import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const USER_KEY = 'token'
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setItem (state, data) {
      state.user = data
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
