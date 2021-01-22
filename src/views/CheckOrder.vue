<template>
  <div id="checkorder">
    <Navbar style="position: absolute"></Navbar>
    <div class="container-fliud" v-if="cart.totalAmount > 0">
      <div class="row">
        <div class="col-md-12 col-xl-8 mt-5 mx-auto">
          <form-wizard
            title
            subtitle
            @on-complete="submit"
            color="var(--brown3)"
            class="mt-5"
          >
            <tab-content :title="steps[0]">
              <div class="container cart mt-5 border">
                <div
                  class="row item p-3 border-bottom"
                  v-for="data in cart.products"
                  :key="data._id"
                >
                  <div
                    class="col-md-2"
                    @click="goDetail(data._id)"
                    style="cursor: pointer"
                  >
                    <img class="w-100" :src="data.src" />
                  </div>
                  <div
                    class="col-md-10 d-flex flex-column justify-content-center"
                  >
                    <div class="row">
                      <div class="col-6 col-md-2 text-left">
                        <p>商品</p>
                        {{ data.name }}
                      </div>
                      <div class="col-6 col-md-3">
                        <p>單價</p>
                        NT{{ data.price | thousands }}
                      </div>
                      <div class="col-6 col-md-3 mt-5 m-sm-0">
                        <p>數量</p>
                        <b-form-spinbutton
                          class="ml-2"
                          id="sb-inline"
                          inline
                          min="1"
                          max="50"
                          v-model="data.quantity"
                          @change="updatequantity(data)"
                        ></b-form-spinbutton>
                      </div>
                      <div class="col-6 col-md-3 mt-5 m-sm-0">
                        <p>小計</p>
                        <small>NT&ensp;</small>
                        {{ (data.price * data.quantity) | thousands }}
                      </div>
                      <div class="col-12 col-md-1 text-center mt-5 mb-3 m-md-0">
                        <button
                          class="btn btn-remove"
                          @click="removeProduct(data)"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </tab-content>
            <tab-content :title="steps[1]">
              <div class="container payment">
                <div class="row">
                  <form class="row w-100 border-bottom mb-3 pb-5">
                    <div class="form-group col-md-6">
                      <label for="username">收件人姓名</label>
                      <input
                        type="text"
                        class="form-control"
                        id="username"
                        value="connect.userName"
                        v-model="connect.userName"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="userphone">收件人電話</label>
                      <input
                        type="text"
                        class="form-control"
                        id="userphone"
                        value="connect.userPhone"
                        v-model="connect.userPhone"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="exampleInputEmail1">連絡信箱</label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        value="connect.userEmail"
                        v-model="connect.userEmail"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="address">收件地址</label>
                      <input
                        type="text"
                        class="form-control"
                        id="address"
                        value="connect.userAddress"
                        v-model="connect.userAddress"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <select
                        class="form-control form-control-sm"
                        v-model="payment"
                      >
                        <option>選擇付款方式</option>
                        <option value="貨到付款">貨到付款</option>
                        <option value="ATM付款">ATM付款</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </tab-content>
            <tab-content :title="steps[2]">
              <div class="container">
                <div
                  class="row item py-1 my-1 p-md-3 m-md-3 border-bottom d-flex justify-content-around align-items-center"
                  v-for="data in cart.products"
                  :key="data._id"
                >
                  <div class="col-4 col-md-4">
                    <b-img center width="80" :src="data.src"></b-img>
                  </div>
                  <div class="col-8">
                    <di class="row detail no-gutters">
                      <div class="col-8 col-md-4">{{ data.name }}</div>
                      <div class="col-4 col-md-3">x{{ data.quantity }}</div>
                      <div class="col-md-4">
                        <small>NT&ensp;</small>
                        {{ (data.price * data.quantity) | thousands }}
                      </div>
                      <div class="col-md-1"></div>
                    </di>
                  </div>
                </div>
                <div class="row item"></div>
              </div>
            </tab-content>
            <div class="container">
              <div class="row justify-content-end mt-4 cart-footer mb-4 m-sm-0">
                <div class="col-md-2 text-center mb-4">
                  共&ensp;{{ cart.totalAmount }}&ensp;件商品
                </div>
                <div class="col-6 col-md-2 text-right">應付金額</div>
                <div class="col-6 col-md-2 text-left">
                  <small>NT&ensp;</small>
                  {{ cart.totalPrice | thousands }}
                </div>
              </div>
            </div>

            <template slot="footer" slot-scope="props">
              <div class="wizard-footer-left">
                <wizard-button
                  v-if="props.activeTabIndex > 0"
                  @click.native="props.prevTab()"
                  :style="props.fillButtonStyle"
                  >返回</wizard-button
                >
              </div>
              <div class="wizard-footer-right">
                <wizard-button
                  v-if="!props.isLastStep"
                  @click.native="props.nextTab()"
                  class="wizard-footer-right"
                  :style="props.fillButtonStyle"
                  >下一步</wizard-button
                >

                <wizard-button
                  v-else
                  @click.native="submit"
                  class="wizard-footer-right finish-button"
                  :style="props.fillButtonStyle"
                  >{{ props.isLastStep ? "確認送出" : "下一步" }}</wizard-button
                >
              </div>
            </template>
          </form-wizard>
        </div>
      </div>
    </div>
    <div class="container-fliud vh-100" v-else>
      <div class="row h-100">
        <h1 class="col-12">你的購物車沒有商品喔</h1>
        <h1>
          <router-link to="/productlist">可以從這裡去看看喔！</router-link>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/main/navbar";
import { mapGetters } from "vuex";
export default {
  components: {
    Navbar,
  },
  name: "CheckOrder",
  computed: {
    ...mapGetters("cartModules", ["cart"]),
  },
  data() {
    return {
      steps: ["確認商品", "確認資料", "送出訂單"],
      payment: "選擇付款方式",
      connect: {
        userName: "",
        userEmail: "",
        userAddress: "",
        userPhone: "",
      },
      cartlist: {},
    };
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/productdetail/${id}`);
    },
    updatequantity(data) {
      this.$store.dispatch("cartModules/updateProduct", data);
    },
    removeProduct(product) {
      const data = {
        _id: product._id,
      };
      this.$alert.totasTopEnd(product.productName, "已移除該商品");
      this.$store.dispatch("cartModules/removeProduct", data);
    },
    getuserdetail() {
      this.axios
        .get(
          process.env.VUE_APP_API +
            "/users/getuser/" +
            this.$store.state.user._id
        )
        .then((res) => {
          this.connect.userName = res.data.result.name;
          this.connect.userEmail = res.data.result.email;
          this.connect.userAddress = res.data.result.address;
          this.connect.userPhone = res.data.result.phone;
        });
    },
    submit() {
      this.cartlist = JSON.parse(localStorage.getItem("vuex")).cartModules.cart;
      if (this.payment === "選擇付款方式") {
        this.$alert.error("未選擇付款方式");
        return;
      }
      if (
        this.connect.userName === "" ||
        this.connect.userEmail === "" ||
        this.connect.userAddress === "" ||
        this.connect.userPhone === "" ||
        this.connect.userAddress === "未填寫" ||
        this.connect.userPhone === "未填寫"
      ) {
        this.$alert.error("資料未填寫完成");
        return;
      }
      this.axios.post(process.env.VUE_APP_API + "/orders/", {
        item: Date.now(),
        account: this.$store.state.user.account,
        connect: this.connect,
        products: this.cartlist.products,
        total: this.cartlist.totalPrice,
        payment: this.payment,
        pay: "未付款",
        status: "未出貨",
        ask: [],
        askstatus: "無",
      });
      this.$alert.success("已送出訂單");
      this.$store.dispatch("cartModules/clearCart");
      this.$router
        .push("/custom/orderdetail")
        .then((res) => {})
        .catch((err) => {
          this.$swal({
            icon: "error",
            title: "錯誤",
            text: err,
          });
        });
    },
  },
  created() {
    this.getuserdetail();
  },
};
</script>

<style lang="stylus" scoped>
.btn-remove{
  @media screen and (max-width: 768px) {
    border 1px solid rgba(0,0,0,0.1)
    border-radius 50%
  }
}
</style>
