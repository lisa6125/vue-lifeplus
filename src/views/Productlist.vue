<template lang="pug">
  div#products
    loading(loader="dots" color="rgba(152, 117, 87, 1)" :active.sync='isLoading')
    Navbar(:class="{nav_show:navshow,nav_close:navhide}" @change='controlcart')
    .container-fluid.pt-5
      .product_nav_bar.row.my-0.mx-auto
        .col-12.p-0.h-100
          .text Enjoy Your Life
          div.w-100.h-100
            #carouselExampleControls.carousel.slide.carousel-fade.w-100.h-100(data-ride='carousel')
              .carousel-inner.w-100.h-100
                .carousel-item.active(data-interval="2000")
                  img.d-block.w-100.h-100(src='../assets/images/banner/1.jpg' alt='...')
                .carousel-item(data-interval="2000")
                  img.d-block.w-100.h-100(src='../assets/images/banner/2.jpg' alt='...')
                .carousel-item(data-interval="2000")
                  img.d-block.w-100.h-100(src='../assets/images/banner/3.jpg' alt='...')
    .container-fluid
      .row.mx-auto
        .col-12.p-0
          nav(aria-label='breadcrumb')
            ol.w-100.h-100.m-0.breadcrumb.align-items-center
              li.breadcrumb-item
                router-link(to='/') home
              li.breadcrumb-item
                router-link(to='/products/all') product
              li.breadcrumb-item.active(aria-current='page') {{this.filter}}
    .container-fluid.showproducts.mt-5.p-0
      .row.m-auto
        .col-12.col-lg-2
          .sticky
            .list-group.mt-4
              router-link.list-group-item.list-group-item-action(:to="`/products/all`") 全部商品
              router-link.list-group-item.list-group-item-action(:to="`/products/table`") 桌子
              router-link.list-group-item.list-group-item-action(:to="`/products/chair`") 椅子
              router-link.list-group-item.list-group-item-action(:to="`/products/sofa`") 沙發
              router-link.list-group-item.list-group-item-action(:to="`/products/cabinet`") 櫃子
              router-link.list-group-item.list-group-item-action(:to="`/products/other`") 其他
        .col-12.col-lg-10.p-0
          .container-lg.p-0
            .row.w-100.m-0
              .col-12.col-sm-6.col-lg-4.my-3.product_item(cols='4',v-for="(product, idx) in filterPro",
                :key="product._id")
                b-card(@click='goDetail(product._id)')
                  .img-box
                    img.img1(:src="product.src1")
                    img.img2(:src="product.src2")
                  .product.mt-2
                      h5 {{ product.productName }}
                      .p_icon.d-flex.justify-content-between
                        span.m-1 NT&nbsp;{{ product.price | thousands}}
                        .icon.d-flex.justify-content-center.align-items-center
                          font-awesome-icon.mr-3(:icon="['fas','heart']" style="color:var(--brown3);font-size:26px" v-if="setliked(product)" @click.stop="changeFavorite(product)")
                          font-awesome-icon.blackheart.mr-3(:icon="['fas','heart']" size="lg" v-else @click.stop="changeFavorite(product)")
                          font-awesome-icon.cart(:icon="['fas','shopping-cart']" size="lg" @click.stop="addProduct(product)")
    .cartddetail(:class='{hidecartddetail:!showcart}')
      table(width='100%' class="mt-5 p-3")
        tr(width='100%' class="border-bottom")
          td(width='30%')
          td(width='25%' class='text-center') 商品
          td(width='20%' class='text-center') 售價
          td(width='20%' class='text-center') 數量
          td(width='5%' class='text-center')
        tr(width='100%' v-for='item in cart.products' class="p-2 border-bottom" @click='goDetail(item._id)')
          td(width='30%' class="p-3")
            img(:src='item.src' class="w-100")
          td(width='25%' class='text-center') {{item.name}}
          td(width='20%' class='text-center') NT &nbsp; {{item.price | thousands}}
          td(width='20%' class='text-center') {{item.quantity}}
          td(width='5%' class='text-center')
            i.fas.fa-times(@click.stop='removeProduct(item)')
        tr
          td.px-5.py-2.text-right(colspan="5") 總價: {{cart.totalPrice | thousands}}
        tr
          td.p-5(colspan="5")
            b-btn.m-1.w-100(@click='goCheack()') 訂單結帳
    .mask(@click='showcart = false' :class='{hidemask:!showcart}')
    Footer
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '../components/main/navbar'
import Footer from '../components/main/footer'
export default {
  components: {
    Navbar,
    Footer
  },
  name: 'Products',
  data () {
    return {
      allproducts: [],
      filter: this.$route.params.filter,
      isLoading: false,
      navshow: true,
      navhide: false,
      lastScrollTop: 0,
      showcart: false
    }
  },
  computed: {
    filterPro () {
      if (this.filter === 'all') {
        return this.allproducts
      } else {
        return this.allproducts.filter(e => {
          return e.type === this.filter
        })
      }
    },
    ...mapGetters('favoritesModules', ['favorites']),
    ...mapGetters('cartModules', ['cart'])
  },
  methods: {
    controlcart (val) {
      this.showcart = val
    },
    goDetail (id) {
      this.$router.push(`/productdetail/${id}`)
    },
    goCheack () {
      if (this.$store.state.user.account.length > 0) {
        this.$router.push('/checkorder')
      } else {
        this.$alert.warning('請先登入後結帳')
        this.$router.push('/login')
      }
    },
    addFaver (product) {
      this.$alert.totasTopEnd(product.productName, '已加入最愛', product.src1)
    },
    // 判斷顯示/隱藏關注樣式
    setliked (item) {
      const liked = this.favorites.filter(favor => favor._id === item._id)
      if (liked.length > 0) {
        return true
      }
      return false
    },
    // 變更喜愛的商品資料(新增/移除)
    changeFavorite (product) {
      this.$store.dispatch('favoritesModules/changeFavorite', product)
      const liked = this.favorites.filter(favor => favor._id === product._id)
      if (liked.length > 0) {
        this.$alert.totasTopEnd(
          product.productName + ' x ' + 1,
          '已加入購物車',
          product.src1
        )
      } else {
        this.$alert.totasTopEnd(product.productName, '已移除最愛')
      }
    },
    nav () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      // console.log(scrollTop)
      if (scrollTop > this.lastScrollTop) {
        this.navshow = false
        this.navhide = true
      } else {
        this.navshow = true
        this.navhide = false
      }
      this.lastScrollTop = scrollTop
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
    }
  },
  mounted () {
    this.isLoading = true
    this.axios
      .get(process.env.VUE_APP_API + '/products/')
      .then(res => {
        const onsaleproducts = res.data.result.filter(e => {
          return e.onsale === true
        })
        this.allproducts = onsaleproducts.map(product => {
          product.src1 =
            process.env.VUE_APP_API +
            '/products/images/' +
            product.images[0].file
          product.src2 =
            process.env.VUE_APP_API +
            '/products/images/' +
            product.images[1].file
          return product
        })
        this.isLoading = false
      })
      .catch(error => {
        this.$alert.error(error.response.data.message)
      })

    window.addEventListener('scroll', this.nav)
  },
  destroyed () {
    window.removeEventListener('scroll', this.nav)
  }
}
</script>
<style lang="stylus" scoped>
  // nav捲動
  .nav_show {
    transform: translateY(0px);
    transition: 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .nav_close {
    transform: translateY(-80px);
    transition: 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    }
#products{
  .container-fluid{
    .row{
      width 70%
      @media screen and (max-width: 576px){
      width 100%
    }
    }
  }
  nav{
    height 80px
    .breadcrumb{
      background var(--brown4)
      a{
        color var(--brown1)
      }
    }
  }
  .product_nav_bar{
    overflow hidden
    height 500px
    position relative
    @media screen and (max-width: 992px){
      height 300px
    }
    @media screen and (max-width: 576px){
      height 150px
    }
    img{
      width 100%
      height 100%
      object-fit cover
      transform translate(0,-20%)
      @media screen and (max-width: 992px){
      transform translate(0,0)
    }
    }
    .text{
      width 70%
      height 70%
      z-index 2
      display flex
      justify-content center
      align-items center
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
      color white
      font-size 2rem
      background var(--black1)
    }
  }
  .showproducts{
    .sticky{
      position sticky
      top 100px
    }
    .product_item{
      .card{
        border none
        .img-box{
          width 100%
          height 300px
          overflow hidden
          position relative
          &:hover{
            .img1{
              transition 0.5s
              opacity 0
            }
            .img2{
            opacity 1
            transition 0.5s
          }
          }
          img{
            opacity 1
            width 100%
            height 100%
            object-fit cover
          }
          .img1{
            opacity 1
            width 100%
            height 100%
            object-fit contain
            position absolute
            top 0px
            left 0px
            transition 0.5s
          }
          .img2{
            opacity 0
          }
        }
        &:hover{
        box-shadow 0 0 20px var(--black1)
        transition 0.3s
        transform translate(0,-5px)
        }
        .blackheart{
          &:hover{
            animation icon 1s ease infinite
          }
        }
        .cart{
          &:hover{
            transform scale(1.2)
            transition 0.5s ease
          }
          &:active{
            transform scale(2)
            transition 0.5s ease
          }
        }
      }
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
  @keyframes icon {
    0%{
      transform scale(1)
    }30%{
      transform scale(1.3)
    }45%{
      transform scale(1)
    }
    60%{
      transform scale(1.3)
    }100%{
      transform scale(1)
    }
  }
}
</style>
