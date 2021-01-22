// import axios from 'axios';

export default {
  namespaced: true,
  state: {
    cart: {
      products: [],
      productCount: 0,
      totalPrice: 0,
      totalAmount: 0
    },
  },
  actions: {
    addProduct(context, data) {
      const products = context.state.cart.products
      let productCount = context.state.cart.productCount
      let totalPrice = 0
      let totalAmount = 0
      if (products.length>0) {
        const product = products.find(e => e._id === data._id)
        if (product) {
          // 如果購物車有這個商品，數量++
          product.quantity += data.quantity
        } else {
          // 如果購物車沒有這個商品，就放進商品清單，並且商品種類++
          products.push(data)
          productCount++
        }
      } else {
        products.push(data)
        productCount++
      }

      // 計算 商品金額 跟 商品數量
      for (const e of products) {
        totalPrice += e.quantity * e.price
        totalAmount += e.quantity
      }
      context.commit('CHANGECART',{
        products,
        productCount,
        totalPrice,
        totalAmount})
    },
    removeProduct (context, data) {
      const products = context.state.cart.products
      let productCount = context.state.cart.productCount
      let totalPrice = 0
      let totalAmount = 0

      const product = products.find(e => e._id === data._id)
      if (product) {
        // 如果購物車有這個商品，就把它移除，並且商品種類等於現在的清單長度
        products.splice(products.indexOf(product), 1)
        productCount = products.length
      } else {
        // 如果購物車沒有這個商品，跳出錯誤
        this.$swal({
          title: '訊息',
          text: '要移除的商品不存在',
          icon: 'error'
        })
        return
      }

      // 計算 商品金額 跟 商品數量
      for (const e of products) {
        totalPrice += e.quantity * e.price
        totalAmount += e.quantity
      }

      context.commit('CHANGECART',{
        products,
        productCount,
        totalPrice,
        totalAmount})
    },
    updateProduct (context, data) {
      const products = context.state.cart.products
      let productCount = context.state.cart.productCount
      let totalPrice = 0
      let totalAmount = 0

      const product = products.find(e => e._id === data._id)
      if (product.quantity > 0) {
        // 如果購物車的這個商品數量大於零，就把資料更新
        product.quantity = data.quantity
        productCount = products.length
      } else {
        // 如果購物車的這個商品數量不大於零，就把這個資料從購物車移除
        context.dispatch('removeProduct', data)
        return
      }

      // 計算 商品金額 跟 商品數量
      for (const e of products) {
        totalPrice += e.quantity * e.price
        totalAmount += e.quantity
      }

      context.commit('CHANGECART',{
        products,
        productCount,
        totalPrice,
        totalAmount})
    },
    clearCart(context) {
      context.commit('CHANGECART',{
        products: [],
        productCount: 0,
        totalPrice: 0,
        totalAmount: 0
      })
    }
  },
  mutations: {
    CHANGECART(state, data) {
      state.cart.products = data.products
      state.cart.productCount = data.productCount
      state.cart.totalPrice = data.totalPrice
      state.cart.totalAmount = data.totalAmount
    },
  },
  getters: {
    cart: state => state.cart
  },
};
