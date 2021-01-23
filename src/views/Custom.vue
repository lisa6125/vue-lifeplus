<template>
  <div id="custom">
    <Navbar @change="controlcart"></Navbar>
    <customSide></customSide>
    <main role="main" class="col-md-9 col-lg-10 px-4">
      <router-view></router-view>
    </main>
    <div class="cartddetail" :class="{ hidecartddetail: !showcart }">
      <table class="mt-5 p-3 w-100">
        <tr class="border-bottom w-100">
          <td style="width: 30%"></td>
          <td style="width: 25%" class="text-center">商品</td>
          <td style="width: 25%" class="text-center">售價</td>
          <td style="width: 20%" class="text-center">數量</td>
          <td style="width: 5%" class="text-center"></td>
        </tr>
        <tr
          class="border-bottom w-100 p-2"
          v-for="item in cart.products"
          @click="goDetail(item._id)"
          :key="item._id"
        >
          <td style="width: 30%" class="text-center p-3">
            <img :src="item.src" class="w-100" />
          </td>
          <td style="width: 25%" class="text-center">{{ item.name }}</td>
          <td style="width: 25%" class="text-center">
            NT &nbsp; {{ item.price | thousands }}
          </td>
          <td style="width: 20%" class="text-center">{{ item.quantity }}</td>
          <td style="width: 5%" class="text-center">
            <i class="fas fa-times" @click.stop="removeProduct(item)"></i>
          </td>
        </tr>
        <tr>
          <td class="px-5 py-2 text-right" colspan="5">
            總價: {{ cart.totalPrice | thousands }}
          </td>
        </tr>
        <tr>
          <td class="p-5" colspan="5">
            <b-btn class="m-1 w-100" @click="goCheack">訂單結帳</b-btn>
          </td>
        </tr>
      </table>
    </div>
    <div
      class="mask"
      @click="showcart = false"
      :class="{ hidemask: !showcart }"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '../assets/css/dashboard.scss'
import customSide from '../components/custompage/customSider'
import Navbar from '../components/main/navbar'
export default {
  components: {
    customSide,
    Navbar,
  },
  name: 'Custom',
  data() {
    return {
      showcart: false,
    }
  },
  computed: {
    ...mapGetters('favoritesModules', ['favorites', 'favorLength']),
    ...mapGetters('cartModules', ['cart']),
  },
  methods: {
    controlcart(val) {
      this.showcart = val
    },
    goCheack() {
      if (this.$store.state.user.account.length > 0) {
        this.$router.push(`/checkorder`)
      } else {
        this.$alert.warning('請先登入後結帳')
        this.$router.push(`/login`)
      }
    },
    addProduct(product) {
      const data = {
        _id: product._id,
        name: product.productName,
        src: product.src1,
        price: product.price,
        quantity: 1,
      }
      this.$alert.totasTopEnd(
        product.productName + ' x ' + '1',
        '已加入購物車',
        product.src1
      )
      this.$store.dispatch('cartModules/addProduct', data)
    },
    // 移除喜歡的商品
    removeFavorItem(product) {
      const index = this.favorites.indexOf(product)
      this.$store.commit('favoritesModules/REMOVEFAVORITEM', index)
    },
    goDetail(id) {
      this.$router.push(`/productdetail/${id}`)
    },
    removeProduct(product) {
      const data = {
        _id: product._id,
      }
      this.$alert.totasTopEnd(product.productName, '已移除購物車')
      this.$store.dispatch('cartModules/removeProduct', data)
    },
  },
}
</script>

<style lang="stylus" scoped>
nav-collapse{
  z-index:5
}
main{
  margin-left:230px
  @media screen and (max-width:765px) {
    margin auto
  }
}
.cartddetail{
  position fixed
  width 40%
  height 100vh
  right 40%
  top 0
  background white
  transform translateX(100%)
  z-index 20000
  overflow auto
  transition 1s ease
  @media screen and (max-width: 768px){
    width 80%
    right 80%
  }
  &.hidecartddetail{
    position fixed
    width 40%
    height 100vh
    right 0
    top 0
    background white
    transform translateX(100%)
    z-index 20000
    overflow auto
    transition 1s ease
    @media screen and (max-width: 768px){
      width 80%
    }
  }
  tr:nth-child(1){
    font-size 1.3rem
  }
  tr:nth-child(1):hover,tr:nth-last-child(1):hover,tr:nth-last-child(2):hover{
    background white
  }
  tr:hover{
    background var(--black1)
  }
  td{
    i{
      &:hover{
        color rgba(250,40,40,0.7)
      }
    }
  }
}
.mask{
  position fixed
  width 100vw
  height 100vh
  right 0
  top 0
  background var(--black3)
  z-index 10000
  &.hidemask{
    display none
  }
}
</style>
