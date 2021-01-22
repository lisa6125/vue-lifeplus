import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'
import cartModules from './cart'
import favoritesModules from './favorites'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      account: '',
      name: '',
      _id: '',
      right: ''
    }
  },
  mutations: {
    logout (state) {
      state.user.account = ''
      state.user.name = ''
      state.user._id = ''
      state.user.right = ''
    },
    login (state, data) {
      state.user.name = data.name
      state.user.account = data.account
      state.user._id = data._id
      state.user.right = data.right
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  },
  modules: {
    cartModules,
    favoritesModules
  },
  plugins: [Persistedstate()]
})
