import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    assets: {}

  },
  getters: {
    getUser: state => state.user,
    getAssetsData: state => state.assets
  },
  mutations: {
    addUser(state, userData) {
      // mutate state
      state.user = userData
    },
    setAssetsData(state, assetsData) {
      // mutate state
      state.assets = assetsData
    },
    _reset(state) {
      state.user = null
    }
  }
})

export default store
