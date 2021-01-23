<template>
  <div id="ProductDetail">
    <Navbar @change="controlcart"></Navbar>
    <div id="show_product_detail" class="container-fluid">
      <div class="row mb-5 mx-auto m-md-auto">
        <div class="col-12 col-md-6">
          <ol class="breadcrumb bg-light">
            <li class="breadcrumb-item">
              <router-link to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/products/all">產品列表</router-link>
            </li>
            <li class="breadcrumb-item active">{{ product.productName }}</li>
          </ol>
        </div>
        <div class="col-12 col-md-6 text-right">
          <li class="btn btn-outline-secondary mb-4" @click="goback()">
            <i class="fas fa-arrow-left"></i> 返回上頁
          </li>
        </div>
      </div>
      <div class="row m-auto">
        <div class="col-12 col-md-6">
          <div class="container-fluid">
            <div class="row mb-3 m-mb-1 w-100">
              <div class="col-12 big-pic">
                <img :src="selectPic" alt="" />
              </div>
            </div>
            <div class="row w-100 m-0 mt-md-2">
              <div
                class="small-pic"
                v-for="(img, index) in showpic"
                :key="index"
              >
                <img :src="img" @click="selectPic = img" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 description">
          <h1 class="mt-5 mx-3 pb-md-3">{{ product.productName }}</h1>
          <h2 class="mt-2 mx-3 pb-2 pb-md-3 border-bottom price">
            {{ product.price | thousands }}
          </h2>
          <div class="description-content mx-3">
            <h4 class="d-block">【產品描述】</h4>
            <p class="p-2">{{ product.description }}</p>
          </div>
          <div class="control">
            <div
              class="countNumber d-flex justify-content-start align-items-center mx-3"
            >
              <button class="btn minus" @click="count(-1)">
                <i class="fas fa-minus"></i>
              </button>
              <input
                class="productNumber"
                type="number"
                max="10"
                min="1"
                v-model="quantity"
              />
              <button class="btn add" @click="count(1)">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <button
              class="btn productbuy mt-4 mt-md-5 py-md-3 w-md-100 mx-3"
              @click="addProduct(product)"
            >
              加入購物車
              <i class="fas fa-shopping-cart"></i>
              <!-- <i class="fas fa-spinner fa-spin"></i> -->
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="maybe_you_like" class="container-fliud p-0">
      <div class="row mx-auto">
        <div class="title m-auto">
          <img src="@/assets/images/ymal.png" alt="" />
        </div>
      </div>
      <div class="row p-5 py-md-3 m-auto">
        <div
          class="like_item col-12 col-md-3 m-0 m-lg-5"
          v-for="item in sameitem"
          :key="item._id"
          @click="goDetail(item._id)"
        >
          <div class="like_item_img d-flex justify-content-center">
            <img :src="item.src" />
          </div>
          <h4 class="text-center py-3">{{ item.productName }}</h4>
        </div>
      </div>
    </div>
    <div id="notice" class="container-fluid">
      <div class="row mx-auto mt-5">
        <div class="col-12">
          <b-tabs content-class="mt-3" justified>
            <b-tab class="p-3" title=" 商品須知" active>
              <ul>
                <li>產品因拍攝關係顏色可能略有差異，實際以廠商出貨為主。</li>
                <li>
                  商品情境照為示意用，僅商品主體不包含其他配件，請以規格內容物為主。
                </li>
              </ul>
            </b-tab>

            <b-tab class="p-3" title="運送說明">
              <ul>
                <li>
                  商品免運費，下單翌日起算兩個工作天內出貨，送貨範圍限台灣本島。注意！收件地址請勿為郵政信箱。
                </li>
                <li>
                  商品頁標示「預購、客製化」商品，將以實際出貨或製作日標示為主。（不適用3個工作天出貨）
                </li>
                <li>送貨方式由物流宅配送達。</li>
                <li>
                  訂購商品若經配送三次無法送達，並經本公司以電話與E-mail均無法聯繫逾三天者，本公司將取消該筆訂單並全額退款。
                </li>
              </ul>
            </b-tab>

            <b-tab class="p-3" title="付款方式">
              <p>
                信用卡安全加密付款, 信用卡安全加密付款, 7-11 ibon 代碼繳費, ATM
                轉帳繳費, 全家 FamiPort 代碼繳費, 信用卡分期 (3 期零利率),
                信用卡分期 (6 期零利率), LINE Pay, Alipay 支付寶
              </p>
            </b-tab>
            <b-tab class="p-3" title="退貨須知">
              <li>
                依《消費者保護法》規定，消費者享有商品簽收翌日起算七天之鑑賞期，期間申請退購無須負擔運費，欲退購者請於七日內提出，逾期恕不受理。注意！猶豫期並非試用期，故退回的商品必須是全新的狀態且完整包裝（含商品本體、配件、贈品、保證書、原廠包裝及所有附隨文件或資料），切勿缺漏任何配件、自行拆解商品、或損毀原廠外盒。如有遺失、毀損或缺件，可能影響您退貨的權益，也將依照損毀程度扣除為復原所需之整新費用。
              </li>
              <li>
                如購買的商品是電腦軟體、遊戲、影音光碟、食品、耗材、個人衛生用品及客製化商品，拆封後除瑕疵品外恕無法辦理退換貨。
              </li>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
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
    <div :class="{ salemask: notsale }"></div>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from '../components/main/navbar'
import Footer from '../components/main/footer'
import { mapGetters } from 'vuex'
export default {
  name: 'ProductDetail',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      product: [],
      sameproducts: [],
      sameitem: [],
      showpic: [],
      selectPic: '',
      showcart: false,
      quantity: 1,
      notsale: ''
    }
  },
  computed: {
    ...mapGetters('favoritesModules', ['favorites', 'favorLength']),
    ...mapGetters('cartModules', ['cart'])
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    controlcart(val) {
      this.showcart = val
    },
    count(val) {
      if (this.quantity === 1 && parseInt(val) < 0) {
        this.quantity = 1
      } else {
        this.quantity = parseInt(this.quantity)
        this.quantity += parseInt(val)
      }
    },
    getProduct() {
      this.axios
        .get(
          process.env.VUE_APP_API +
            '/products/product/' +
            this.$route.params.productId
        )
        .then(res => {
          this.product = res.data.result
          this.selectPic =
            process.env.VUE_APP_API +
            '/products/images/' +
            this.product.images[0].file
          for (let i = 0; i < this.product.images.length; i++) {
            this.showpic.push(
              process.env.VUE_APP_API +
                '/products/images/' +
                this.product.images[i].file
            )
          }
          if (this.product.onsale === false) {
            this.notsale = true
          }
        })
    },
    getProducts() {
      this.axios.get(process.env.VUE_APP_API + '/products/').then(res => {
        this.sameproducts = res.data.result.filter(item => {
          return (
            item.type === this.product.type && item._id !== this.product._id
          )
        })
        if (this.sameproducts > 3) {
          for (let i = 0; i < 3; i++) {
            const r = Math.floor(Math.random() * this.sameproducts.length)
            const idx = this.sameitem.findIndex(
              item => item._id === this.sameproducts[r]._id
            )
            console.log(idx)
            if (idx !== -1) {
              i--
            } else {
              if (this.sameitem.length < 3) {
                this.sameitem.push(this.sameproducts[r])
              }
            }
          }
        } else {
          this.sameitem = this.sameproducts.slice(0)
        }
        this.sameitem.map(product => {
          product.src =
            process.env.VUE_APP_API +
            '/products/images/' +
            product.images[0].file
        })
      })
    },
    goDetail(id) {
      this.$router.push(`/productdetail/${id}`)
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
        src:
          process.env.VUE_APP_API +
          '/products/images/' +
          product.images[0].file,
        price: product.price,
        quantity: this.quantity
      }
      this.$alert.success('已加入購物車')
      this.$store.dispatch('cartModules/addProduct', data)
      this.quantity = 1
      // this.showcart = true
    },
    removeProduct(product) {
      const data = {
        _id: product._id,
      }
      this.$alert.totasTopEnd(product.productName, '已移除購物車')
      this.$store.dispatch('cartModules/removeProduct', data)
    },
    updateProduct(product) {
      const data = {
        _id: product._id,
        quantity: 1, //這裡要綁定，還沒寫
      }
      this.$alert.totasTopEnd(product.productName, '已更新購物車')
      this.$store.dispatch('cartModules/updateProduct', data)
    }
  },
  created() {
    this.getProduct()
    this.getProducts()
  }
}
</script>
<style lang="stylus">
#ProductDetail{
  #show_product_detail{
    padding-top 120px
    .row{
      width 75%
      @media screen and (max-width: 996px) {
        width 100%
      }
      .breadcrumb-item a{
        color var(--brown2)
      }
      .big-pic{
        height 500px
        @media screen and (max-width: 576px) {
          height 250px
        }
        img{
          width 100%
          height 100%
          object-fit contain
        }
      }
      .small-pic{
        width 20%
        height 100px
        padding-right 10px
        box-sizing border-box
        @media screen and (max-width: 576px) {
          height 50px
        }
        img{
          width 100%
          height 100%
          object-fit cover
        }
      }
      .description{
        h1,h4{
          color var(--brown1)
          @media screen and (max-width: 576px) {
            font-size 1.2rem
          }
        }
        h2{
          @media screen and (max-width: 576px) {
            font-size 1rem
          }
        }
        .price{
          color rgba(200,12,12,0.7)
        }
        p{
          font-size 20px
          line-height 40px
          color var(--brown2)
          @media screen and (max-width: 576px) {
            font-size 1rem
            line-height 25px
          }
        }
        .countNumber{
          input{
            width 40%
            height 50px
            font-size 28px
            border-radius 0
            color var(--black4)
            border-color var(--black3)
            @media screen and (max-width: 576px) {
              height 30px
              font-size 18px
            }
            &:focus{
              outline: none
            }
          }
          .btn{
            width 50px
            height 50px
            border-radius 0
            background var(--brown4)
            @media screen and (max-width: 576px) {
              height 30px
              width 30px
              padding 0
            }
            &:hover{
              background var(--brown3)
            }
          }
        }
        .productbuy{
          background var(--brown2)
          color white
          font-size 24px
          @media screen and (max-width: 576px) {
            font-size 1rem
          }
          &:hover{
            background var(--brown3)
          }
        }
      }
    }
  }
  #maybe_you_like{
    margin-top 150px
    margin-bottom 150px
    padding-top 50px
    @media screen and (max-width: 768px) {
      margin-top 80px
      margin-bottom 50px
    }
    .row{
      position relative
      width 75%
      margin-bottom 80px
      @media screen and (max-width: 768px) {
        width 100%
      }
      @media screen and (max-width: 576px) {
        margin-bottom 0px
      }

      .title{
        &:after{
          position absolute
          content ''
          width 100%
          height 5px
          top 50%
          left 0px
          transform translate(0%,-50%)
          background var(--brown1)
          z-index -1
        }
        img{
          width 50%
          border 10px solid white
          @media screen and (max-width: 576px) {
            width 70%
            margin-left 15%
          }
        }
      }
      .like_item{
        padding-top 15px
        border-radius 15px
        h4{
          color var(--brown1)
        }
        transition 0.5s
        &:hover{
          box-shadow 0 0 15px var(--black2)
          transition 0.5s
        }
        &_img{
          overflow hidden
          height 500px
          width 100%
          position relative
          @media screen and (max-width: 768px) {
            height 200px
          }
          img{
            width 100%
            height 100%
            object-fit contain
            transition 0.5s
          }
          &:hover{
            img{
              transition 0.5s
              opacity 0.7
            }
          }
        }
      }
    }
  }
  #notice{
    margin-bottom 200px
    @media screen and (max-width: 576px) {
      margin-bottom 50px
    }
    .row{
      width 75%
      @media screen and (max-width: 768px) {
        width 100%
      }
      .nav-tabs{
        border-bottom 1px solid var(--brown2)
        a{
          color var(--brown2)
        }
      }
      .tab-content{
        li,p{
          font-size 20px
          line-height 32px
          color var(--black3)
        }
      }
      .nav-tabs .nav-link{
        font-size 24px
        &.active{
        border-color var(--brown2)
        border-bottom 2px solid white
        color var(--brown1)
        }
        &:hover{
          border-color none
          background var(--brown3)
          color white
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
  .salemask{
    position fixed
    width 100vw
    height 100vh
    right 0
    top 0
    background var(--black3)
    z-index 10000
    &:before{
      content '此商品無上架,去其他地方看看吧!ฅ(๑*д*๑)ฅ!!'
      position absolute
      top 50%
      left 50%
      color white
      font-size 3rem
      transform translate(-50%,-50%)
    }
  }
}
</style>
