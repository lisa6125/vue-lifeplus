export default {
  namespaced: true,
  state: {
    favorites: [], // 喜歡商品資料
    favorLength: 0, // 喜歡商品資料筆數
  },
  actions: {
    // 變更喜愛的商品資料(新增/移除)
    changeFavorite(context, product) {
      let delIndex = -1 // 儲存有在 favorites 中資料的 index

      if (context.state.favorites.length > 0) {
        context.state.favorites.forEach((item, index) => {
          if (item._id === product._id) {
            delIndex = index
          }
        })
      }

      if (delIndex === -1) {
        // 不存在則加入陣列
        context.commit('ADDTOFAVORITES', product)
      } else {
        // 存在則移除
        context.commit('REMOVEFAVORITEM', delIndex)
      }

      // // 儲存至 localStorage
      // context.commit('UPDATEFAVORITES')

      // // 重新整理
      // context.commit('FAVORITES')
    },
  },
  mutations: {
    // FAVORITES(state) {
    //   state.favorites = JSON.parse(localStorage.getItem('favorites')) || []
    // },
    // UPDATEFAVORITES(state) {
    //   state.favorites = localStorage.setItem('favorites', JSON.stringify(state.favorites))
    // },
    // FAVORITESLENGTH(state) {
    //   state.favorLength = state.favorites.length
    // },
    ADDTOFAVORITES(state, item) {
      state.favorites.push(item)
      state.favorLength = state.favorites.length
    },
    REMOVEFAVORITEM(state, delIndex) {
      state.favorites.splice(delIndex, 1)
      state.favorLength = state.favorites.length
    }
  },
  getters: {
    favorites: state => state.favorites,
    favorLength: state => state.favorLength,
  },
}
