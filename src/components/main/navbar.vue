<template>
  <div id="mainnav">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <router-link class="navbar-brand" :to="`/`">
        <img class="logo" src="@/assets/images/LOGO.png" alt="" />
      </router-link>
      <div
        class="navbar-new d-flex flex-sm-wrap justify-content-between flex-grow-1"
      >
        <div class="navbar-nav d-flex flex-row justify-content-between">
          <router-link class="nav-item nav-link" :to="`/`">Home</router-link>
          <router-link class="nav-item nav-link" :to="`/products/all`"
            >Products</router-link
          >
          <router-link class="nav-item nav-link" :to="`/share`"
            >Share</router-link
          >
        </div>
        <div class="navbar-nav d-flex flex-row justify-content-between">
          <div class="dropdown" id="faver">
            <li
              class="dropdown-toggle nav-item nav-link"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <font-awesome-icon
                :icon="['fas', 'heart']"
                size="lg"
              ></font-awesome-icon>
              <span v-if="favorLength > 0">{{ favorLength }}</span>
            </li>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <table class="itemContent w-100">
                <tbody
                  class="d-flex justify-content-start align-items-center flex-column"
                >
                  <h3 class="itemTitle" v-if="favorLength === 0">
                    還沒有喜歡的商品嗎?
                  </h3>
                  <h3 class="itemTitle" v-else>MY FAVER</h3>
                  <tr
                    class="w-100 border-bottom py-2"
                    v-for="item in favorites"
                    :key="item._id"
                    @click="goDetail(item._id)"
                  >
                    <td width="15%" class="text-center">
                      <i
                        class="fas fa-cart-plus cartIcon"
                        @click.stop="addProduct(item)"
                      ></i>
                    </td>
                    <td width="20%" class="itemPicture">
                      <div class="picturewrap">
                        <img :src="item.src1" alt="" />
                      </div>
                    </td>
                    <td class="itemName">
                      <p class="d-block">{{ item.productName }}</p>
                    </td>
                    <td width="10%" class="itemDelete">
                      <div
                        class="delfaver d-inline-block text-center"
                        style="cursor: pointer"
                        @click.stop="removeFavorItem(item)"
                      >
                        X
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- <a class="nav-item nav-link" href="#">
          MyFaver&nbsp;
              <font-awesome-icon :icon="['fas','heart']" size="lg"></font-awesome-icon>
              <span v-if="favorLength > 0">{{ favorLength }}</span>
        </a> -->
          <a class="nav-item nav-link" @click.stop="change">
            <font-awesome-icon
              :icon="['fas', 'shopping-cart']"
              size="lg"
            ></font-awesome-icon>
            <span class="cartamount" v-if="cart.totalAmount > 0">{{
              cart.totalAmount
            }}</span>
          </a>
          <router-link
            class="nav-item nav-link"
            :to="`/login`"
            v-if="user.account.length === 0"
          >
            <font-awesome-icon
              :icon="['fas', 'user']"
              size="lg"
            ></font-awesome-icon>
          </router-link>
          <div
            class="dropdown d-flex flex-column justify-content-center align-items-center"
            id="account"
          >
            <a
              class="dropdown-toggle nav-item nav-link"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              v-if="user.account.length > 0 && user.right === false"
            >
              <font-awesome-icon
                :icon="['fas', 'user']"
                size="lg"
              ></font-awesome-icon>
            </a>
            <div
              class="account dropdown-menu"
              aria-labelledby="dropdownMenuLink"
            >
              <router-link class="nav-link text-center m-2" :to="`/custom`">
                <font-awesome-icon
                  :icon="['fas', 'archive']"
                  size="lg"
                ></font-awesome-icon
                >&ensp;個人資料
              </router-link>
              <router-link
                class="nav-link text-center m-2"
                :to="`/custom/orderdetail`"
              >
                <font-awesome-icon
                  :icon="['fas', 'pen-nib']"
                  size="lg"
                ></font-awesome-icon
                >&ensp;訂單查詢
              </router-link>
              <router-link
                class="nav-link text-center m-2"
                :to="`/custom/sharedetail`"
              >
                <font-awesome-icon
                  :icon="['fas', 'id-card']"
                  size="lg"
                ></font-awesome-icon
                >&ensp; 分享回饋
              </router-link>
            </div>
          </div>
          <router-link
            class="nav-item nav-link"
            :to="`/admin`"
            v-if="user.account.length > 0 && user.right === true"
          >
            <font-awesome-icon
              :icon="['fas', 'user']"
              size="lg"
            ></font-awesome-icon>
          </router-link>
          <a
            id="logout"
            class="nav-item nav-link"
            href="#"
            v-if="user.account.length > 0"
            @click="logout"
          >
            Logout
          </a>
        </div>
        <div class="nav-icon">
          <i class="fas fa-bars mr-3" @click="shownew = !shownew"></i>
        </div>
      </div>
      <div class="new_version_navbar" v-show="shownew">
        <div class="new-navbar-nav d-flex flex-row justify-content-between">
          <router-link class="nav-item nav-link" :to="`/`">Home</router-link>
          <router-link class="nav-item nav-link" :to="`/products/all`"
            >Products</router-link
          >
          <router-link class="nav-item nav-link" :to="`/share`"
            >Share</router-link
          >
          <a
            id="logout"
            class="nav-item nav-link"
            href="#"
            v-if="user.account.length > 0"
            @click="logout"
          >
            Logout
          </a>
        </div>
        <div class="new-navbar-nav d-flex flex-row justify-content-center mt-3">
          <div class="dropdown" id="faver">
            <li
              class="dropdown-toggle nav-item nav-link"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <font-awesome-icon
                :icon="['fas', 'heart']"
                size="lg"
              ></font-awesome-icon>
              <span v-if="favorLength > 0">{{ favorLength }}</span>
            </li>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <table class="itemContent w-100">
                <tbody
                  class="d-flex justify-content-start align-items-center flex-column"
                >
                  <h3 class="itemTitle" v-if="favorLength === 0">
                    還沒有喜歡的商品嗎?
                  </h3>
                  <h3 class="itemTitle" v-else>MY FAVER</h3>
                  <tr
                    class="w-100 border-bottom py-2"
                    v-for="item in favorites"
                    :key="item._id"
                    @click="goDetail(item._id)"
                  >
                    <td width="15%" class="text-center">
                      <i
                        class="fas fa-cart-plus cartIcon"
                        @click.stop="addProduct(item)"
                      ></i>
                    </td>
                    <td width="20%" class="itemPicture">
                      <div class="picturewrap">
                        <img :src="item.src1" alt="" />
                      </div>
                    </td>
                    <td class="itemName">
                      <p class="d-block">{{ item.productName }}</p>
                    </td>
                    <td width="10%" class="itemDelete">
                      <div
                        class="delfaver d-inline-block text-center"
                        style="cursor: pointer"
                        @click.stop="removeFavorItem(item)"
                      >
                        X
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- <a class="nav-item nav-link" href="#">
            MyFaver&nbsp;
                <font-awesome-icon :icon="['fas','heart']" size="lg"></font-awesome-icon>
                <span v-if="favorLength > 0">{{ favorLength }}</span>
          </a> -->
          <a
            id="cart"
            class="nav-item nav-link align-self-center"
            @click.stop="change"
          >
            <font-awesome-icon
              :icon="['fas', 'shopping-cart']"
              size="lg"
            ></font-awesome-icon>
            <span class="cartamount" v-if="cart.totalAmount > 0">{{
              cart.totalAmount
            }}</span>
          </a>
          <router-link
            class="nav-item nav-link align-self-center"
            :to="`/login`"
            v-if="user.account.length === 0"
          >
            <font-awesome-icon
              :icon="['fas', 'user']"
              size="lg"
            ></font-awesome-icon>
          </router-link>
          <div
            class="dropdown d-flex flex-column justify-content-center align-items-center"
            id="account"
          >
            <a
              class="dropdown-toggle nav-item nav-link"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              v-if="user.account.length > 0 && user.right === false"
            >
              <font-awesome-icon
                :icon="['fas', 'user']"
                size="lg"
              ></font-awesome-icon>
            </a>
            <div
              class="account dropdown-menu"
              aria-labelledby="dropdownMenuLink"
            >
              <router-link class="nav-link text-center m-2" :to="`/custom`">
                <font-awesome-icon
                  :icon="['fas', 'archive']"
                  size="lg"
                ></font-awesome-icon
                >&ensp;個人資料
              </router-link>
              <router-link
                class="nav-link text-center m-2"
                :to="`/custom/orderdetail`"
              >
                <font-awesome-icon
                  :icon="['fas', 'pen-nib']"
                  size="lg"
                ></font-awesome-icon
                >&ensp;訂單查詢
              </router-link>
              <router-link
                class="nav-link text-center m-2"
                :to="`/custom/sharedetail`"
              >
                <font-awesome-icon
                  :icon="['fas', 'id-card']"
                  size="lg"
                ></font-awesome-icon
                >&ensp; 分享回饋
              </router-link>
            </div>
          </div>
          <router-link
            class="nav-item nav-link align-self-center"
            :to="`/admin`"
            v-if="user.account.length > 0 && user.right === true"
          >
            <font-awesome-icon
              :icon="['fas', 'user']"
              size="lg"
            ></font-awesome-icon>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
// import $ from 'jquery'
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  data () {
    return {
      shownew: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    ...mapGetters('favoritesModules', ['favorites', 'favorLength']),
    ...mapGetters('cartModules', ['cart'])
  },
  methods: {
    logout () {
      this.axios
        .delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          // 如果登出成功
          if (res.data.success) {
            this.$alert.success('登出成功')

            // 清除 vuex
            this.$store.commit('logout')

            // 導回首頁
            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
          } else {
            this.$alert.error(res.data.message)
          }
        })
        .catch(error => {
          // 如果回來的狀態碼不是 200，直接 alert 錯誤訊息
          this.$alert.error(error.response.data.message)
        })
    },
    addProduct (product) {
      const data = {
        _id: product._id,
        name: product.productName,
        src: product.src1,
        price: product.price,
        quantity: 1
      }
      this.$alert.totasTopEnd(
        product.productName + ' x ' + '1',
        '已加入購物車',
        product.src1
      )
      this.$store.dispatch('cartModules/addProduct', data)
    },
    // 移除喜歡的商品
    removeFavorItem (product) {
      const index = this.favorites.indexOf(product)
      this.$store.commit('favoritesModules/REMOVEFAVORITEM', index)
    },
    goDetail (id) {
      this.$router.push(`/productdetail/${id}`)
    },
    removeProduct (product) {
      const data = {
        _id: product._id
      }
      this.$alert.totasTopEnd(product.productName, '已移除購物車')
      this.$store.dispatch('cartModules/removeProduct', data)
    },
    updateProduct (product) {
      const data = {
        _id: product._id,
        quantity: 1 // 這裡要綁定，還沒寫
      }
      this.$alert.totasTopEnd(product.productName, '已更新購物車')
      this.$store.dispatch('cartModules/updateProduct', data)
    },
    change () {
      this.$emit('change', true)
    }
  }
}
</script>

<style lang="stylus" scoped>
#mainnav{
  z-index 10000
  width 100%
  position fixed
  nav{
    padding 0 8%
    height 80px
    @media screen and (max-width:576px) {
      height 80px
      padding 0 10px
    }
  }
  .navbar{
    background var(--brown2)
    a{
      padding 0
      margin 0
      z-index 10
    }
    &::after{
      content ''
      position absolute
      width 100%
      height 10px
      background #fff
      top 0
      left 0
    }
  }
  .navbar-brand img{
    height 80px
  }
  .navbar-new{
    @media screen and (max-width:768px) {
      flex-direction column
      margin-top 7px
    }
  }
  .navbar-nav{
    .nav-item{
      margin 0 35px
      position relative
      display flex
      justify-content center
      align-items center
      @media screen and (max-width:1200px) {
        display none
      }
    }
    .cartamount{
      position absolute
      top 7px
      right -23px
      color rgba(255,255,255,0.7)
      font-size 16px
    }
    span{
      position absolute
      top 7px
      right -16px
      color rgba(255,255,255,0.7)
      font-size 16px
    }
  }
  .navbar-collapse{
    margin-top 10px
    &.collapsing , &.collapse.show{
      background-color var(--brown4)
      .navbar-dark,.navbar-nav,.nav-link{
        margin 8px 0
        color var(--brown1)
      }
    }
  }

  #faver{
    .dropdown-menu{
      width 400px
      max-height 500px
      overflow-x auto
      @media screen and (max-width:768px) {
        width 200px
        max-height 300px
        position absolute
        h3{
          font-size 1rem
        }
      }
      tr:hover{
        background #F2F2F2
      }
      .delfaver{
        width 25px
        height 25px
        border-radius 50%
        &:hover{
          background var(--brown2s)
        }
      }
      .cartIcon{
        font-size 1.5rem
        padding-right 5px
        @media screen and (max-width:768px) {
          font-size 1rem
        }
        &:hover{
          transform scale(1.2)
          transition 0.5s ease
        }
        &:active{
          transform scale(2)
          transition 0.5s ease
        }
      }
      img{
        width 100px
        @media screen and (max-width:768px) {
          width 50px
        }
      }
      .picturewrap img{
        @media screen and (max-width:768px) {
          width 50px
        }
      }
    }
    .dropdown-toggle::after{
      display none
    }
  }
  .dropdown-menu{
    a{
      color var(--brown1)
    }
  }
  #account .dropdown-toggle::after{
    display none
  }
  .nav-icon{
    color rgba(255,255,255,0.5)
    display flex
    justify-content flex-end
    @media screen and (min-width:1200px) {
      display none
    }
  }
  .new_version_navbar{
    animation nav 0.5s ease 0s 1
    position absolute
    top 90px
    left 50%
    transform translateX(-50%)
    padding 20px 15px
    width 95vw
    background var(--black3)
    color white
    @media screen and (min-width:1200px) {
      display none
    }
    a{
      color white
    }
    .new-navbar-nav{
      margin 0 auto
      max-width 700px
      min-width 200px
      #cart{
        margin 0 20%
      }
    }
  }
  @keyframes nav {
    0%{
      opacity 0
      height 0px
    }100%{
      opacity 1
      height 120px
    }
  }
}
</style>
