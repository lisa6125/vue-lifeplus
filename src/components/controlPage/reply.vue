<template>
  <div id="OrderReply" class="container-fluid p-5">
    <div class="row mx-5 px-5 pb-4 border-bottom border-dark">
      <h5 class="col-7">回覆管理</h5>
      <div class="col-5 text-right">
        <div class="btn btn-outline-secondary mr-3" @click="filter = '全部'">
          全部
        </div>
        <div class="btn btn-outline-secondary mr-3" @click="filter = '已回覆'">
          已回覆
        </div>
        <div class="btn btn-outline-secondary mr-3" @click="filter = '未回覆'">
          未回覆
        </div>
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
    <div class="row mx-5 px-5">
      <div class="row w-100 mb-4 pt-3"></div>
      <div class="row w-100">
        <div class="w-100 p-2">
          <div
            class="orders_item border"
            v-for="order in orderfilter"
            :key="order._id"
          >
            <div class="item_status row px-4 py-3 d-flex align-items-center">
              <div class="text-left col-2">訂單編號:&emsp;{{ order.item }}</div>
              <div class="col-2">
                <span class="mr-2">回覆狀態:</span>
                <span>{{ order.askstatus }}</span>
              </div>
              <div class="col-5">
                <span class="mr-1">用戶:</span> {{ order.account }}
              </div>
              <div class="text-right col-3">
                <div
                  class="btn btn-outline-secondary"
                  @click="order.showoederdetail = !order.showoederdetail"
                >
                  訂單細項
                </div>
              </div>
            </div>
            <div
              class="user_item_connect row m-0 w-100 border-top bg-white"
              v-show="order.showoederdetail"
            >
              <div class="col-2">
                <div class="text-left mx-1 my-2">
                  總價:&emsp;NT{{ order.total | thousands }}
                </div>
                <div class="text-left mx-1 my-2">
                  付款方式:&emsp;{{ order.payment }}
                </div>
                <div class="text-left mx-1 my-2">
                  付款狀態:&emsp;{{ order.pay }}
                </div>
                <div class="text-left mx-1 my-2">
                  出貨狀態:&emsp;{{ order.status }}
                </div>
              </div>
              <div class="col-3 border-left my-2">
                <div
                  class="item_connect d-flex flex-column justify-content-center align-items-start"
                >
                  <div class="account mx-1 my-2">
                    用戶:&emsp;{{ order.account }}
                  </div>
                  <div class="username mx-1 my-2">
                    收件人:&emsp;{{ order.connect.userName }}
                  </div>
                  <div class="userphone mx-1 my-2">
                    連絡電話:&emsp;{{ order.connect.userPhone }}
                  </div>
                  <div class="useremail mx-1 my-2">
                    連絡信箱:&emsp;{{ order.connect.userEmail }}
                  </div>
                  <div class="useraddress mx-1 my-2">
                    收件地址:&emsp;{{ order.connect.userAddress }}
                  </div>
                </div>
              </div>
              <div class="reply_area col-7 m-0 border-left bg-white p-2">
                <div class="row p-3">
                  <div class="col-10">
                    <p
                      class="text-left"
                      v-for="(data, index) in order.ask"
                      :key="index"
                    >
                      {{ data }}
                    </p>
                  </div>
                  <div class="col-2">
                    <div
                      class="btn btn-outline-success"
                      @click="order.edit = true"
                      v-show="order.ask.length > 0"
                    >
                      建立回覆
                    </div>
                  </div>
                </div>
                <div class="row p-3 mt-5" v-show="order.edit">
                  <div class="col-12 d-flex">
                    <input
                      type="text"
                      class="form-control col-8 mr-4"
                      v-model="order.reply"
                    />
                    <div
                      class="btn btn-outline-success mr-auto"
                      @click="submit(order)"
                    >
                      送出
                    </div>
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
      allorders: [],
      changelist: false,
      filter: "全部",
    };
  },
  computed: {
    orderfilter() {
      if (this.filter === "全部") {
        return this.allorders;
      } else {
        return this.allorders.filter((e) => {
          return e.askstatus === this.filter;
        });
      }
    },
  },
  methods: {
    getallorder() {
      this.axios.get(process.env.VUE_APP_API + "/orders").then((res) => {
        this.allorders = res.data.result.map((item) => {
          item.payModel = item.pay;
          item.statusModel = item.status;
          item.showoederdetail = false;
          item.edit = false;
          item.reply = "";
          return item;
        });
      });
    },
    liststatus() {
      this.allorders = this.allorders.reverse();
      if (this.changelist) {
        this.changelist = false;
      } else {
        this.changelist = true;
      }
    },
    goDetail(id) {
      this.$router.push(`/productdetail/${id}`);
    },
    submit(order) {
      this.axios.patch(
        process.env.VUE_APP_API + "/orders/reply/" + order.item,
        {
          reply: order.reply,
          askstatus: "已回覆",
        }
      );
      this.getallorder();
      order.reply = "";
      this.$alert.success("回覆問題成功");
    },
  },
  created() {
    this.getallorder();
  },
};
</script>
<style lang="stylus" scoped>
.orders_item{
  border-radius 20px
  margin-bottom 20px
  border 1px solid var(--black2)
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
}
.reply_area{
  max-height 200px
  overflow-y auto
  overflow-x hidden
  word-break break-all
}
</style>
