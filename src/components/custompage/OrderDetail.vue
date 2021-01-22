<template>
  <div id="OrderDetail" class="text-center px-md-5" style="padding-top: 100px">
    <p style="font-size: 2rem">訂單明細</p>
    <div class="container-fluid px-md-5">
      <div class="row top w-100 mb-4 pb-3">
        <div class="col-6 p-0 col-md-2 text-left">
          <b-button v-b-modal.modal-center>訂單詢問</b-button>
          <b-modal id="modal-center" centered title="請填寫訂單編號與問題">
            <form>
              <div class="form-group">
                <label for="askitem">訂單編號</label>
                <input
                  type="askitem"
                  class="form-control"
                  id="askitem"
                  v-model="askitem"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">問題描述</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="askquestion"
                ></textarea>
              </div>
              <div class="btn btn-success float-right" @click="submit">
                送出
              </div>
            </form>
          </b-modal>
        </div>
        <div class="col-0 col-md-8"></div>
        <div class="col-6 p-0 col-md-2 text-right">
          <div
            class="btn btn-outline-secondary"
            v-if="changelist"
            @click="liststatus()"
          >
            現在是新到舊
          </div>
          <div class="btn btn-outline-secondary" v-else @click="liststatus()">
            現在是舊到新
          </div>
        </div>
      </div>
      <div class="row w-100 m-0">
        <div class="w-100 p-2">
          <div class="orders_item" v-for="order in userorders" :key="order._id">
            <div class="row item_status d-flex p-3">
              <div
                class="col-12 col-md-2 my-3 m-md-0 text-left d-flex align-self-center"
              >
                訂單編號:&emsp;{{ order.item }}
              </div>
              <div
                class="col-6 col-md-2 my-3 m-md-0 text-left d-flex align-self-center"
              >
                總價:&emsp;NT{{ order.total | thousands }}
              </div>
              <div
                class="col-6 col-md-2 my-3 m-md-0 text-left d-flex align-self-center"
              >
                付款方式:&emsp;{{ order.payment }}
              </div>
              <div
                class="col-6 col-md-2 my-3 m-md-0 text-left d-flex align-self-center"
              >
                付款狀態:&emsp;{{ order.pay }}
              </div>
              <div
                class="col-6 col-md-2 my-3 m-md-0 text-left d-flex align-self-center"
              >
                出貨狀態:&emsp;{{ order.status }}
              </div>
              <div
                class="col-12 col-md-2 my-3 m-md-0 text-left d-flex align-self-center"
              >
                <div
                  class="btn btn-outline-secondary"
                  @click="order.showoederdetail = !order.showoederdetail"
                >
                  查看訂單細項
                </div>
              </div>
            </div>
            <div
              class="user_item_connect row m-0 w-100 border-top bg-white"
              v-show="order.showoederdetail"
            >
              <div class="col-12 col-md-8 p-1">
                <div
                  class="d-flex flex-wrap border-bottom m-3 item_products"
                  v-for="item in order.products"
                  :key="item._id"
                  @click="goDetail(item._id)"
                >
                  <div class="pic col-6 col-md-3">
                    <img :src="item.src" alt="" />
                  </div>
                  <div class="name col-6 col-md-3">{{ item.name }}</div>
                  <div class="quantity col-6 col-md-3">
                    X{{ item.quantity }}
                  </div>
                  <div class="price col-6 col-md-3">{{ item.price }}</div>
                </div>
              </div>
              <div class="col-12 col-md-4 border-left my-2">
                <div
                  class="item_connect d-flex flex-column justify-content-center align-items-start"
                >
                  <div class="username my-1 mx-md-1 my-md-2">
                    收件人:&emsp;{{ order.connect.userName }}
                  </div>
                  <div class="userphone my-1 mx-md-1 my-md-2">
                    連絡電話:&emsp;{{ order.connect.userPhone }}
                  </div>
                  <div class="useremail my-1 mx-md-1 my-md-2">
                    連絡信箱:&emsp;{{ order.connect.userEmail }}
                  </div>
                  <div class="useraddress my-1 mx-md-1 my-md-2">
                    收件地址:&emsp;{{ order.connect.userAddress }}
                  </div>
                </div>
              </div>
              <div
                class="user_ask_answer row m-0 w-100 border-top bg-white p-2"
              >
                <div class="col-12 col-md-2 left">
                  <p
                    style="
                      font-size: 1.3rem;
                      background: var(--brown2);
                      color: white;
                    "
                  >
                    問答回覆
                  </p>
                  <p>回覆狀態</p>
                  <p>{{ order.askstatus }}</p>
                </div>
                <div class="col-12 col-md-8">
                  <div
                    class="ask text-left"
                    v-for="(data, index) in order.ask"
                    :key="index"
                  >
                    {{ data }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDetail",
  data() {
    return {
      userorders: [],
      changelist: false,
      askitem: "",
      askquestion: "",
    };
  },
  methods: {
    getorders() {
      this.axios
        .get(
          process.env.VUE_APP_API + "/orders/" + this.$store.state.user.account
        )
        .then((res) => {
          this.userorders = res.data.result.map((item) => {
            item.showoederdetail = false;
            return item;
          });
        });
    },
    liststatus() {
      this.userorders = this.userorders.reverse();
      if (this.changelist) {
        this.changelist = false;
      } else {
        this.changelist = true;
      }
    },
    goDetail(id) {
      this.$router.push(`/productdetail/${id}`);
    },
    submit() {
      this.axios
        .patch(process.env.VUE_APP_API + "/orders/ask/" + this.askitem, {
          userask: this.askquestion,
          askstatus: "未回覆",
        })
        .then((res) => {
          this.userorders.find((e, index) => {
            if (e.item === res.data.result.item) {
              res.data.result.showoederdetail = false;
              this.userorders.splice(index, 1, res.data.result);
            }
          });
          console.log(this.userorders);
        });
      this.askitem = "";
      this.askquestion = "";
      this.$alert.success("新增問題成功");
    },
  },
  created() {
    this.getorders();
  },
};
</script>

<style lang="stylus" scoped>
#OrderDetail{
  .top{
    @media screen and (max-width:992px) {
      flex-flow row
    }
  }
  .orders_item{
    // border-bottom 1px solid var(--brown3)
    margin-bottom 20px
    border 1px solid var(--brown1)
    border-radius 20px
    &:nth-child(odd){
      background rgba(0,0,0,0.03)
    }
    &:hover{
    background var(--brown4)
    color var(--brown1)
  }
  }
  .user_item_connect{
    border-bottom-right-radius 20px
    border-bottom-left-radius 20px
    .item_products{
      .pic img{
        width 100px
        @media screen and (max-width:576px) {
          width 50px
        }
      }
      &:hover{
        color var(--brown2)
        font-size 1.2rem
        img{
          transform scale(1.2)
        }
      }
    }
    .item_connect{
      color var(--black3)
    }
  }
  .user_ask_answer{
    max-height 200px
    overflow auto
    border-bottom-right-radius 20px
    border-bottom-left-radius 20px
    .left{
      border-right 1px solid rgba(0,0,0,0.1)
      @media screen and (max-width:576px) {
        border-right none
        border-bottom 1px solid rgba(0,0,0,0.1)
      }
    }
    .ask{
      display flex
      flex-flow wrap
      word-break break-all
    }
  }
}
</style>
