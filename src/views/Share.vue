<template>
  <div id="Share" class="container-fluid p-0">
    <Navbar
      :class="{ nav_show: navshow, nav_close: navhide }"
      @change="controlcart"
    ></Navbar>
    <div class="share-view">
      <div class="share-title">Share your life</div>
      <Photoswipe>
        <div
          v-masonry="containerId"
          transition-duration="0.3s"
          item-selector=".item"
        >
          <div
            v-masonry-tile
            class="item"
            v-for="(item, index) in shares"
            :key="index"
          >
            <div class="post">
              <p>{{ item.poster }}</p>
              <img :src="item.src" v-pswp="item" alt="" />
            </div>
          </div>
        </div>
      </Photoswipe>
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
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "../components/main/navbar";
import Footer from "../components/main/footer";
export default {
  components: { Footer, Navbar },
  name: "Share",
  data() {
    return {
      navshow: true,
      navhide: false,
      lastScrollTop: 0,
      showcart: false,
      shares: [],
    };
  },
  computed: {
    ...mapGetters("favoritesModules", ["favorites"]),
    ...mapGetters("cartModules", ["cart"]),
  },
  methods: {
    controlcart(val) {
      this.showcart = val;
    },
    goDetail(id) {
      this.$router.push(`/productdetail/${id}`);
    },
    goCheack() {
      if (this.$store.state.user.account.length > 0) {
        this.$router.push(`/checkorder`);
      } else {
        this.$alert.warning("請先登入後結帳");
        this.$router.push(`/login`);
      }
    },
    addFaver(product) {
      this.$alert.totasTopEnd(product.productName, "已加入最愛", product.src1);
    },
    // 判斷顯示/隱藏關注樣式
    setliked(item) {
      const liked = this.favorites.filter((favor) => favor._id === item._id);
      if (liked.length > 0) {
        return true;
      }
      return false;
    },
    // 變更喜愛的商品資料(新增/移除)
    changeFavorite(product) {
      this.$store.dispatch("favoritesModules/changeFavorite", product);
      const liked = this.favorites.filter((favor) => favor._id === product._id);
      if (liked.length > 0) {
        this.$alert.totasTopEnd(
          product.productName + " x " + 1,
          "已加入購物車",
          product.src1
        );
      } else {
        this.$alert.totasTopEnd(product.productName, "已移除最愛");
      }
    },
    nav() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      // console.log(scrollTop)
      if (scrollTop > this.lastScrollTop) {
        this.navshow = false;
        this.navhide = true;
      } else {
        this.navshow = true;
        this.navhide = false;
      }
      this.lastScrollTop = scrollTop;
    },
    addProduct(product) {
      const data = {
        _id: product._id,
        name: product.productName,
        src: product.src1,
        price: product.price,
        quantity: 1,
      };
      this.$alert.totasTopEnd(
        product.productName + " x " + "1",
        "已加入購物車",
        product.src1
      );
      this.$store.dispatch("cartModules/addProduct", data);
    },
    removeProduct(product) {
      const data = {
        _id: product._id,
      };
      this.$alert.totasTopEnd(product.productName, "已移除購物車");
      this.$store.dispatch("cartModules/removeProduct", data);
    },
    updateProduct(product) {
      const data = {
        _id: product._id,
        quantity: 1, //這裡要綁定，還沒寫
      };
      this.$alert.totasTopEnd(product.productName, "已更新購物車");
      this.$store.dispatch("cartModules/updateProduct", data);
    },
    getshares() {
      this.axios.get(process.env.VUE_APP_API + "/shares/").then((res) => {
        let postshare = res.data.result.filter((e) => {
          return e.onshare === "審核通過";
        });
        this.shares = postshare.map((e) => {
          e.src =
            process.env.VUE_APP_API + "/shares/images/" + e.images[0].file;
          return e;
        });
      });
    },
  },
  created() {
    this.getshares();
  },
  mounted() {
    window.addEventListener("scroll", this.nav);
  },
  destroyed() {
    window.removeEventListener("scroll", this.nav);
  },
};
</script>

<style lang="stylus" scoped>
.share-title{
  font-family: 'Sacramento', cursive
  font-size 3.5rem
  height 150px
  text-align center
  line-height 150px
  border-bottom 2px solid white
  margin-bottom 50px
  color white
  text-shadow 0 0 20px rgba(0,0,0,0.5)
  @media screen and (max-width:576px) {
    font-size 2rem
    height 100px
    line-height 100px
  }
}
  // nav捲動
.nav_show {
  transform: translateY(0px);
  transition: 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}
.nav_close {
  transform: translateY(-80px);
  transition: 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}
.share-view{
  padding 100px 350px 50px 350px
  background url('../assets/images/sharebg2.jpg')
  background-repeat no-repeat
  background-size cover
  background-position center -200px
  background-attachment fixed
  @media screen and (max-width:1600px) {
    padding 100px 50px 50px 50px
    background-position center center
  }
  .item{
    margin 0 auto
    width 33%
    padding 10px
    @media screen and (max-width:576px) {
    width 100%
  }
    .post{
      padding 10px
      border-radius 5px
      background white
      img{
        width 100%
        height 100%
        object-fit cover
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
</style>
