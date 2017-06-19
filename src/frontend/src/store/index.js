import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    getUser: state => state.user
  },
  mutations: {
    addUser(state, userData) {
      // mutate state
      state.user = userData
    },
    _reset(state) {
      state.user = null
    }
  }
})

export default store
