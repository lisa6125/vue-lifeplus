<template>
  <div id="home">
    <Navbarhome :class="{nav_show:navshow,nav_close:navhide}" @change='controlcart'></Navbarhome>
    <section id="section01">
      <div id="topnav">
        <div class="topnav_left">
          <img src="@/assets/images/LOGO.png" alt="">
          <div class="topnav-nav">
            <a class="topnav-nav-item" href="#/">Home</a>
            <router-link class="topnav-nav-item" :to="`/products/all`">Products</router-link>
            <router-link class="topnav-nav-item" :to="`/share`">Share</router-link>
          </div>
        </div>
        <div class="topnav_right">
          <div class="topnav_right-nav">
            <div class="dropdown" id="faver">
              <li class="dropdown-toggle nav-item nav-link" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <font-awesome-icon :icon="['fas','heart']" size="lg"></font-awesome-icon>
                  <span v-if="favorLength > 0">{{ favorLength }}</span>
              </li>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <table class="itemContent w-100">
                  <tbody class="d-flex justify-content-start align-items-center flex-column">
                    <h3 class="itemTitle" v-if='favorLength === 0'>還沒有喜歡的商品嗎?</h3>
                    <h3 class="itemTitle" v-else>MY FAVER</h3>
                    <tr class="w-100 border-bottom py-2" v-for="item in favorites" :key="item._id" @click="goDetail(item._id)">
                      <td width="15%" class="text-center">
                        <i class="fas fa-cart-plus cartIcon"  @click.stop="addProduct(item)"></i>
                      </td>
                      <td width="20%" class="itemPicture">
                        <div class="picturewrap">
                          <img :src="item.src1" alt="">
                        </div>
                      </td>
                      <td class="itemName">
                        <p class="d-block text-center">{{ item.productName }}</p></td>
                      <td class="itemDelete" >
                        <div class="delfaver d-inline-block text-center" style="cursor: pointer" @click.stop="removeFavorItem(item)">X</div>
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
            <a class="nav-item nav-link" @click='showcart = true'>
                  <font-awesome-icon :icon="['fas','shopping-cart']" size="lg"></font-awesome-icon>
                  <span class="cartamount" v-if="cart.totalAmount > 0">{{cart.totalAmount}}</span>
            </a>
            <router-link class="nav-item nav-link" :to="`/login`" v-if="user.account.length === 0">
                  <font-awesome-icon :icon="['fas','user']" size="lg"></font-awesome-icon>
            </router-link>
            <div class="dropdown d-flex justify-content-center align-items-center">
              <a class="dropdown-toggle nav-item nav-link" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="user.account.length > 0 && user.right===false">
                    <font-awesome-icon :icon="['fas','user']" size="lg"></font-awesome-icon>
              </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <router-link class="nav-link text-center m-2" :to="`/custom/`">
                  <font-awesome-icon :icon="['fas','archive']" size="lg"></font-awesome-icon>&ensp;個人資料
                  </router-link>
                  <router-link class="nav-link text-center m-2" :to="`/custom/orderdetail`">
                  <font-awesome-icon :icon="['fas','pen-nib']" size="lg"></font-awesome-icon>&ensp;訂單查詢
                  </router-link>
                  <router-link class="nav-link text-center m-2" :to="`/custom/sharedetail`">
                  <font-awesome-icon :icon="['fas','id-card']" size="lg"></font-awesome-icon>&ensp;
                  分享回饋
                  </router-link>
                </div>
            </div>
            <router-link class="nav-item nav-link" :to="`/admin`" v-if="user.account.length > 0 && user.right===true">
                  <font-awesome-icon :icon="['fas','user']" size="lg"></font-awesome-icon>
            </router-link>
            <a class="nav-item nav-link" href="#" v-if="user.account.length > 0" @click="logout">
              Logout
            </a>
          </div>
        </div>
      </div>
      <div id="topleft">
        <div id="topicon">
          <img src="@/assets/images/fb.png" alt="">
          <img src="@/assets/images/ig.png" alt="">
          <img src="@/assets/images/github.png" alt="">
        </div>
        <div id="topdescript">
          <p>金色稻麥</p>
          <p>拾橞的鳥兒</p>
          <p>伴隨秋意微風</p>
          <p>隱匿於家中每點角落</p>
        </div>
      </div>
      <div id="topright">
        <div id="carouselExampleControls" class="carousel slide w-100 h-100" data-ride="carousel">
          <div class="carousel-inner  w-100 h-100">
            <div class="carousel-item active">
              <img src="@/assets/images/banner01.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="@/assets/images/banner02.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="@/assets/images/banner03.png" class="d-block w-100" alt="...">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <font-awesome-icon :icon="['fas','angle-left']" size="lg"></font-awesome-icon>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next" style="">
          <font-awesome-icon :icon="['fas','angle-right']" size="lg"></font-awesome-icon>
          </a>
        </div>
      </div>
    </section>
    <div class="container-fluid d-flex justify-content-center" id="nav_link_item">
      <div class="row h-100">
        <div class="col-3 p-0">
          <router-link class="nav-link text-center" :to="`/products/sofa`">
            <img src="../assets/images/sofa.png" class="b-block" alt="">
            <h6>SOFA</h6>
          </router-link>
        </div>
        <div class="col-3 p-0">
          <router-link class="nav-link text-center" :to="`/products/table`">
            <img src="../assets/images/table.png" class="b-block" alt="">
            <h6>TABLE</h6>
          </router-link>
        </div>
        <div class="col-3 p-0">
          <router-link class="nav-link text-center" :to="`/products/chair`">
            <img src="../assets/images/chair.png" class="b-block" alt="">
            <h6>CHAIR</h6>
          </router-link>
        </div>
        <div class="col-3 p-0">
          <router-link class="nav-link text-center" :to="`/products/cabinet`">
            <img src="../assets/images/cabinet.png" class="b-block" alt="">
            <h6>CABINET</h6>
          </router-link>
        </div>
      </div>
    </div>
    <div class="container-fluid" id="section02">
      <div id="life_style" class="mb-0 mb-md-5">
        <img src="@/assets/images/ls.png" alt="">
      </div>
      <div class="row pt-0 pt-md-5 mx-auto" id="life_style_top">
        <div class="col-4 mt-5 m-md-0 item">
          <div class="item_cover">
            <img class="w-100" src="@/assets/images/lifestyle/01.png" alt="">
            <router-link to="/products/other" class="text text-decoration-none">
              <p>食宴。派對</p>
            </router-link>
          </div>
        </div>
        <div class="col-4 mt-5 m-md-0 item">
          <div class="item_cover">
            <img class="w-100" src="@/assets/images/lifestyle/02.png" alt="">
            <router-link to="/products/chair" class="text text-decoration-none">
              <p>午後。靜謐</p>
            </router-link>
          </div>
        </div>
        <div class="col-4 mt-5 m-md-0 item">
          <div class="item_cover">
            <img class="w-100" src="@/assets/images/lifestyle/03.png" alt="">
            <router-link to="/products/other" class="text text-decoration-none">
              <p>輕簡。旅行</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="row pt-2 pt-md-5 mx-auto" id="life_style_buttom">
        <div class="col-6 item">
          <div class="item_cover">
            <img class="w-100" src="@/assets/images/lifestyle/04.png" alt="">
            <router-link to="/products/chair" class="text text-decoration-none">
              <p>植綠。妝點</p>
            </router-link>
          </div>
        </div>
        <div class="col-6 item">
          <div class="item_cover">
            <img class="w-100" src="@/assets/images/lifestyle/05.png" alt="">
            <router-link to="/products/sofa" class="text text-decoration-none">
              <p>生活。軌跡</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <section id="section03">
      <div id="what_new_title" class="mb-0 mb-md-5">
        <img src="@/assets/images/wn.png" alt="">
      </div>
      <div is="swiper" class="mt-5 mt-md-0 pt-0 pt-md-5"></div>
    </section>
    <section id="section04">
      <div id="subscribe">
        <div id="text_news">
          <p>訂閱我們</p>
          <p>獲得最新消息與優惠</p>
        </div>
        <div id="sub_btn">
          <input type="text">
          <button type="button" class="btn btn-lg">訂閱</button>
        </div>
      </div>
    </section>
    <div id="section05">
      <div class="container-fluid p-5">
        <div class="row w-100 d-flex justify-content-center">
          <div class="col-12 col-lg-5 m-3">
            <div class="tall_title float-left" @click='show1=!show1'>
              <font-awesome-icon :icon="['fas','hands']" size="lg" class="mr-3"></font-awesome-icon>
              <span>價值理念</span>
            </div>
            <div class="tall_content" :class="{show:show1}">
              <span class="text">享家點的理念起源於為大多數人提供價格實惠的家具家飾，而非僅為了少數人。透過將功能、品質、設計和價值結合在一起，而且始終秉持著永續要素，並透過設計、採購、包裝、配送與經營業務模式，在每一個環節都體現享家點理念，實踐我們的願景：為大多數人創造更美好的生活。</span>

            </div>
          </div>
          <div class="col-12 col-lg-5 m-3">
            <div class="tall_title float-left" @click='show2=!show2'>
              <font-awesome-icon :icon="['fas','drafting-compass']" size="lg" class="mr-3"></font-awesome-icon>
              <span>大眾化設計</span>
            </div>
            <div class="tall_content" :class="{show:show2}">
              <span class="text">對我們來說，好的設計就是結合了形式、功能、品質、永續發展及人人負擔得起的價格。我們稱它為「大眾化設計」，因為我們相信好的家具是為每個人所設計。</span>
              
            </div>
          </div>
        </div>
        <div class="row w-100 d-flex justify-content-center">
          <div class="col-12 col-lg-5 m-3 ">
            <div class="tall_title float-left" @click='show3=!show3'>
              <font-awesome-icon :icon="['fas','hand-holding-heart']" size="lg" class="mr-3"></font-awesome-icon>
              <span>維護地球</span>
            </div>
            <div class="tall_content" :class="{show:show3}">
              <span class="text">我們的世界正在迅速變化，但我們對未來感到樂觀。 我們相信，隨著時間的推移，越來越多的人可以並且將會擁有更美好的生活。要實現這一目標，需要強大的企圖心和對採取立即行動的承諾。它還意味著借由同心協力來應對我們無法單獨解決的重大挑戰。希望激勵並讓更多人實現永續的生活方式，同時既簡單也是人人負擔得起。通過改變我們的工作方式來實現這目標，對生態循環起正面的作用，並在各地都產生積極的社會影響。</span>
              
            </div>
          </div>
          <div class="col-12 col-lg-5 m-3">
            <div class="tall_title float-left" @click='show4=!show4'>
              <font-awesome-icon :icon="['fas','shipping-fast']" size="lg" class="mr-3"></font-awesome-icon>
              <span>運送說明</span>
            </div>
            <div class="tall_content" :class="{show:show4}">
              <ul class="text">
                <li>商品免運費，下單翌日起算兩個工作天內出貨，送貨範圍限台灣本島。注意！收件地址請勿為郵政信箱。</li>
                <li>商品頁標示「預購、客製化」商品，將以實際出貨或製作日標示為主。（不適用3個工作天出貨</li>
                <li>送貨方式由物流宅配送達。</li>
                <li>訂購商品若經配送三次無法送達，並經本公司以電話與E-mail均無法聯繫逾三天者，本公司將取消該筆訂單並全額退款。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cartddetail" :class='{hidecartddetail:!showcart}'>
      <table class="mt-5 p-3 w-100">
        <tr class="border-bottom w-100">
          <td style="width:30%"></td>
          <td style="width:25%" class="text-center">商品</td>
          <td style="width:25%" class="text-center">售價</td>
          <td style="width:20%" class="text-center">數量 </td>
          <td style="width:5%" class="text-center"></td>
        </tr>
        <tr class="border-bottom w-100 p-2" v-for='item in cart.products' @click='goDetail(item._id)' :key='item._id'>
          <td style="width:30%" class="text-center p-3">
            <img :src='item.src' class="w-100">
          </td>
          <td style="width:25%" class="text-center">{{item.name}}</td>
          <td style="width:25%" class="text-center">NT &nbsp; {{item.price | thousands}}</td>
          <td style="width:20%" class="text-center">{{item.quantity}} </td>
          <td style="width:5%" class="text-center">
            <i class="fas fa-times" @click.stop='removeProduct(item)'></i>
          </td>
        </tr>
        <tr>
          <td class="px-5 py-2 text-right" colspan="5">總價: {{cart.totalPrice | thousands}}</td>
        </tr>
        <tr>
          <td class="p-5" colspan="5">
            <b-btn class=" m-1 w-100" @click="goCheack">訂單結帳</b-btn>
          </td>
        </tr>
      </table>
    </div>
    <div class="mask" @click='showcart = false' :class='{hidemask:!showcart}'></div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Footer from '../components/main/footer.vue'
import Navbarhome from '../components/main/navbarhome'
import Swiper from '../components/main/Swiper.vue'
export default {
  components: {
    Navbarhome,
    Swiper,
    Footer
  },
  name: 'Home',
  data () {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      navshow: true,
      navhide:false,
      lastScrollTop: 0,
      showcart:false,
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
    controlcart(val){
      this.showcart=val
    },
    goCheack() {
      if(this.$store.state.user.account.length>0){
        this.$router.push(`/checkorder`)
      }else{
        this.$alert.warning('請先登入後結帳')
        this.$router.push(`/login`)
      }
    },
    logout () {
      this.axios.delete(process.env.VUE_APP_API + '/users/logout')
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
    nav() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      if (scrollTop  > 600) {
        this.navshow = false
        this.navhide = true
      } else {
        this.navshow = true
        this.navhide = false
      }
    },
    addProduct(product) {
      const data = {
          _id: product._id,
          name: product.productName,
          src: product.src1,
          price: product.price,
          quantity: 1
      }
      this.$alert.totasTopEnd(product.productName + ' x ' + '1', '已加入購物車', product.src1)
      this.$store.dispatch('cartModules/addProduct',data)
    },
    // 移除喜歡的商品
    removeFavorItem(product) {
      const index = this.favorites.indexOf(product);
      this.$store.commit('favoritesModules/REMOVEFAVORITEM', index)
    },
    goDetail(id) {
      this.$router.push(`/productdetail/${id}`)
    },
    removeProduct(product) {
      const data = {
        _id: product._id
      }
      this.$alert.totasTopEnd(product.productName , '已移除購物車',)
      this.$store.dispatch('cartModules/removeProduct',data)
    },
    updateProduct(product) {
      const data = {
        _id: product._id,
        quantity: 1 //這裡要綁定，還沒寫
      }
      this.$alert.totasTopEnd(product.productName , '已更新購物車',)
      this.$store.dispatch('cartModules/updateProduct',data)
    }
  },
  mounted () {
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
    transform: translateY(-80px);
    transition: 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .nav_close {
    transform: translateY(0px);
    transition: 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    }
#home{
  section{
    width 100%
    height 100vh
  }
  // #section01::after{
  //   content ''
  //   position absolute
  //   width 100%
  //   height 120px
  //   background var(--brown2)
  //   bottom 0
  //   left 0
  // }
  #section01{
    position relative
    @media screen and (max-width: 768px){
      margin-bottom 0px
    }
    #topnav{
      width 100%
      height 18%
      display flex
      @media screen and (max-width: 768px){
        height 38%
        flex-flow column
        }
      .topnav_left{
        position relative
        width 50%
        height 100%
        @media screen and (max-width: 768px){
        width 100%
        // height 70%
        }
        border-bottom 1px solid var(--brown1)
        &::before{
          content ''
          position absolute
          width 70%
          height 35px
          background url('../assets/images/slogn.png') no-repeat
          background-size contain
          top 120%
          left 22%
          @media screen and (max-width: 768px){
          width 200px
          top 75%
          left 50%
          transform translateX(-50%)
          }
        }
        &::after{
        content ''
        position absolute
        width 1px
        height 170%
        background-color var(--brown1)
        top 0px
        left 20%
        @media screen and (max-width: 768px){
        display none
        }
        }
        img{
          height 90%
          margin-left 23%
          @media screen and (max-width: 768px){
            margin-left 0
            height 80px
            position absolute
            top 0px
            left 50%
            transform translateX(-50%)
          }
        }
        .topnav-nav{
          position absolute
          top 75%
          left 68%
          @media screen and (max-width: 768px){
            display flex
            justify-content center
            top 100%
            left 50%
            transform translateX(-50%)
          }
          .topnav-nav-item{
            font-size 1.2rem
            color var(--brown1)
            margin 5%
          }
        }
      }
      .topnav_right{
        width 50%
        height 100%
        margin-top 100px
        padding-left 20%
        @media screen and (max-width: 768px){
        width 100%
        // height 50%
        padding 0
        margin 0
        }
        &::before{
          content ''
          position absolute
          width 25%
          height 20px
          background-color var(--brown3)
          top 5%
          right 0px
          @media screen and (max-width: 768px){
          display none
          }
        }
        .topnav_right-nav {
          display flex
          justify-content flex-end
          margin-right 31%
          @media screen and (max-width: 768px){
            position absolute
            top 28%
            left 50%
            transform translateX(-50%)
          }
          @media screen and (max-width: 576px){
            top 30%
            min-width 250px
            justify-content center
            margin 0px
            display flex
            flex-flow wrap
            width 100%
          }
          .nav-link{
            margin 0 10px
            color var(--brown1)
            font-size 1rem
            display flex
            position relative
            @media screen and (max-width: 576px){
              margin 0px
            }
            .cartamount{
              position absolute
              top 7px
              right -5px
              color var(--brown1)
              font-size 16px
            }
          }
          #faver{
            position relative
            .dropdown-menu{
              width 400px
              max-height 500px
              overflow-x auto
              @media screen and (max-width: 576px){
                width 220px
                max-height 300px
              }
              tr{
                @media screen and (max-width: 576px){
                  height 80px
                }
                &:hover{
                  background #F2F2F2
                }
              }
              h3{
                @media screen and (max-width: 576px){
                  font-size:16px
                }
              }
              .cartIcon{
                font-size 1.5rem
                @media screen and (max-width: 576px){
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
              .delfaver{
                width 25px
                height 25px
                border-radius 50%
                &:hover{
                  background var(--brown2s)
                }
              }
              img{
                width 100px
                @media screen and (max-width: 576px){
                  width 50px
                }
              }
            }
            span{
              position absolute
              top 7px
              right -4px
              color var(--brown1)
              font-size 16px
            }
            .dropdown-toggle::after{
              display none
            }
          }
        }
      }
    }
    #topleft{
      position absolute
      width 40%
      height 70%
      bottom 0
      left 0
      display flex
      @media screen and (max-width: 768px){
      height 25%
      width 40px
      top 40%
      z-index 100
      }
      @media screen and (max-width: 576px){
        top 51%
        }
      #topicon{
        width 20%
        height 100%
        padding-top 40%
        padding-left 3%
        @media screen and (max-width: 768px){
        height 100%
        width 100%
        padding 10px 10px
        }
        img{
          height 40px
          color var(--brown1)
          margin 20px
          @media screen and (max-width: 768px){
            height 20px
            margin 10px 0px
            z-index 100
          }
        }
      }
      #topdescript{
        width 80%
        height 100%
        padding 30% 15%
        @media screen and (max-width: 768px){
          display none
        }
        p{
          font-size 1.5rem
          color var(--brown1)
          font-family: 'Noto Sans TC', sans-serif
          font-weight 500
        }
      }
    }
    #topright{
      position absolute
      width 60%
      height 65%
      bottom 0
      right 0
      @media screen and (max-width: 768px){
      width 100%
      height 50%
      top 40%
      z-index -2
      }
      @media screen and (max-width: 576px){
        top 46%
        }
      &::before{
        content ''
        position absolute
        width 70%
        height 3px
        background #fff
        top 93%
        right 2%
        z-index 10
        @media screen and (max-width: 768px){
        display none
        }
      }
      &::after{
        content ''
        position absolute
        width 3px
        height 70%
        background #fff
        top 28%
        right 4%
        z-index 10
        @media screen and (max-width: 768px){
        display none
        }
      }
      .carousel-control-prev{
        position absolute
        top 85%
        left -12%
        width 80px
        height 50px
        @media screen and (max-width: 768px){
          display none
        }
        .carousel-control-next-icon{
          color var(--brown1)
        }
        svg{
          color:var(--brown1);font-size:3rem
        }
      }
      .carousel-control-next{
        position absolute
        top 85%
        left 5%
        width 80px
        height 50px
        @media screen and (max-width: 768px){
          display none
        }
        background:var(--brown3)
        svg{
          font-size:3rem
        }
      }
    }
  }
  #nav_link_item{
    height 150px
    background var(--brown2)
    overflow hidden
    @media screen and (max-width: 576px){
      margin -100px 0
      height 100px
    }
    .row{
      width 75%
      @media screen and (max-width: 576px){
        width 100%
        h6{
          font-size 10px
        }
      }
    }
    a{
      height 100%
      color white
      transition 1s ease
      padding-top 20px
      img{
        height 80px
        @media screen and (max-width: 576px){
          height 40px
        }
      }
      &:hover{
        background var(--brown3)
        transition 0.5s ease
      }
    }
  }
  #section02{
    margin-top 150px
    @media screen and (max-width: 768px){
      margin-top 190px
    }
    #life_style{
      width 73.5%
      height 2px
      margin auto
      background var(--brown2)
      position relative
      @media screen and (max-width: 992px){
        width 96.5%
      }
      img{
        width 300px
        position absolute
        top 50%
        left 25%
        transform translate(-50%,-50%)
        background white
        border 50px solid white
        @media screen and (max-width: 768px){
          width 200px
          border 15px solid white
        }
      }
    }
    #life_style_top{
      width 75%
      @media screen and (max-width: 992px){
        width 100%
      }
      .item{
        height 450px
        @media screen and (max-width: 576px){
          padding 0 5px
          height 150px
        }
        .item_cover{
          overflow hidden
          height 100%
          width 100%
          img{
            height 100%
            width 100%
            object-fit cover
            transition 0.5s
          }
          .text{
            opacity 0
            color white
            display flex
            justify-content center
            align-items center
            background var(--black2)
            border 3px double white
            margin 7% 7%
            width 85%
            height 85%
            position absolute
            top 0
            left 0
            transition 0.3s
            p{
              font-size 2rem
              @media screen and (max-width:768px) {
                font-size 1rem
              }
            }
          }
          &:hover{
            .text{
              opacity 1
              transition 0.5s
            }
            img{
              transform scale(1.2)
              transition 0.5s
            }
          }
        }
      }
    }
    #life_style_buttom{
      width 75%
      @media screen and (max-width: 992px){
        width 100%
      }
      .item{
        height 450px
        @media screen and (max-width: 576px){
          padding 0 5px
          height 150px
        }
        .item_cover{
          overflow hidden
          height 100%
          width 100%
          img{
            height 100%
            width 100%
            object-fit cover
            transition 0.5s
          }
          .text{
            opacity 0
            color white
            display flex
            justify-content center
            align-items center
            background var(--black2)
            border 3px double white
            margin 7% 7%
            width 85%
            height 85%
            position absolute
            top 0
            left 0
            transition 0.3s
            p{
              font-size 2rem
              @media screen and (max-width:768px) {
                font-size 1rem
              }
            }
          }
          &:hover{
            .text{
              opacity 1
              transition 0.5s
            }
            img{
              transform scale(1.2)
              transition 0.5s
            }
          }
        }
      }
    }
  }
  #section03{
    height 70vh
    margin-top 100px
    #what_new_title{
      width 72.5%
      height 2px
      margin auto
      background var(--brown2)
      position relative
      @media screen and (max-width: 992px){
        width 96.5%
      }
      img{
        width 300px
        position absolute
        top 50%
        left 25%
        transform translate(-50%,-50%)
        background white
        border 50px solid white
        @media screen and (max-width: 768px){
          width 200px
          border 15px solid white
        }
      }
    }
  }
  #section04{
    margin-top 50px
    height 500px
    #subscribe{
      width 72.5%
      height 500px
      margin auto
      background url('../assets/images/sub.jpg')
      background-repeat no-repeat
      background-position center center
      background-size cover
      background-attachment fixed
      display flex
      justify-content center
      align-items center
      flex-flow column
      @media screen and (max-width: 992px){
        width 90.5%
        height 450px
      }
      #text_news{
        width 40%
        @media screen and (max-width: 768px){
          width 80%
        }
        p{
          font-size 2.5rem
          color white
          font-family: 'Noto Sans TC', sans-serif
          font-weight 500
          margin 0
          padding 0
          @media screen and (max-width: 768px){
            font-size 1.5rem
          }
        }
      }
      #sub_btn{
        width 40%
        display flex
        justify-content space-between
        @media screen and (max-width: 768px){
          width 80%
        }
        input{
          width 70%
          height 50px
          border none
          font-size 1.5rem
          @media screen and (max-width: 768px){
          height 30px
          }
        }
        button{
          background var(--brown3)
          color white
          font-family: 'Noto Sans TC', sans-serif
          font-weight 500
          font-size 1.5rem
          @media screen and (max-width: 768px){
            height 35px
            font-size 01rem
            padding 5px 10px
          }
        }
      }
    }
  }
  #section05{
    width 72.5%
    margin auto
    background var(--brown4)
    @media screen and (max-width: 992px){
      width 90.5%
    }
    .tall_title{
      width 80%
      height 80px
      color var(--brown1)
      font-size 1.5rem
      font-weight 700
      background white
      border-radius 40px
      text-align center
      line-height 80px
      @media screen and (max-width: 1200px){
        font-size 1rem
      }
      @media screen and (max-width: 992px){
        width 100%
        font-size 1rem
      }
      &:hover{
        box-shadow 0 0 15px var(--black1)
        transition 0.5s
      }
      &:active{
        background var(--brown3)
      }
    }
    .tall_content{
      display none
      font-size 1.2rem
      color var(--brown1)
      line-height 2rem
      font-weight 700
      width 100%
      height 80%
      border 2px solid var(--brown1)
      padding 50px 20px
      margin-top 50px
      margin-left 15px
      border-radius 0 15px 15px 15px
      transition 1s
      @media screen and (max-width: 992px){
        font-weight 500
        line-height 1.2rem
        font-size 0.8rem
      }
      .text{
        opacity 0
      }
    }
    .show{
      display block
      animation showheight 0.5s
      transition 1s
      .text{
        opacity 1
        animation showop 5s
        transition 2s
      }
    }
  }
  .dropdown-toggle::after{
    display none
  }
  .dropdown-menu{
    z-index 100
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
      @media screen and (max-width: 576px){
        font-size 0.8rem
      }
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
  @keyframes showheight {
    0%{
      height 0%
    }
    100%{
      height 80%
    }
  }
  @keyframes showop {
    0%{
      opacity 0
    }
    40%{
      opacity 0.8
    }
    100%{
      opacity 1
    }
  }
}
</style>
