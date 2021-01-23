<template>
  <div id="controlorder" class="container-fluid p-5">
    <div class="row mx-5 px-5 pb-4 border-bottom border-dark">
      <h5 class="col-10">訂單管理</h5>
      <div class="col-2 text-right">
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
    <div class="row mx-5 px-5 mb-4 mt-2">
      <div class="text-left d-flex align-self-center" style="width: 19%">
        訂單編號
      </div>
      <div class="text-left d-flex align-self-center" style="width: 15%">
        總價
      </div>
      <div class="text-left d-flex align-self-center" style="width: 15%">
        付款方式
      </div>
      <div class="text-left d-flex align-self-center" style="width: 18%">
        付款狀態
      </div>
      <div class="text-left d-flex align-self-center" style="width: 13%">
        出貨狀態
      </div>
      <div class="text-left d-flex align-self-center position-relative">
        <input
          type="text"
          class="search"
          placeholder="搜尋訂單"
          v-model="filter"
        />
        <i
          class="fas fa-search position-absolute"
          style="top: 22%; left: 85%"
        ></i>
      </div>
    </div>
    <div class="row mx-5 px-3">
      <div class="w-100 p-2">
        <div
          class="orders_item border"
          v-for="(order, index) in orderfilter"
          :key="order._id"
        >
          <div class="item_status d-flex p-3">
            <div class="text-left d-flex align-self-center" style="width: 19%">
              &emsp;{{ order.item }}
            </div>
            <div class="text-left d-flex align-self-center" style="width: 15%">
              &emsp;NT{{ order.total | thousands }}
            </div>
            <div class="text-left d-flex align-self-center" style="width: 15%">
              &emsp;{{ order.payment }}
            </div>
            <div
              class="text-left d-flex align-self-center"
              style="width: 18%"
              v-if="order.edit === false"
            >
              &emsp;{{ order.pay }}
            </div>
            <div
              class="text-left d-flex align-self-center"
              style="width: 18%"
              v-else
            >
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                style="width: 50%"
                v-model="order.payModel"
              >
                <option>未付款</option>
                <option>已付款</option>
              </select>
            </div>
            <div
              class="text-left d-flex align-self-center"
              style="width: 13%"
              v-if="order.edit === false"
            >
              &emsp;{{ order.status }}
            </div>
            <div
              class="text-left d-flex align-self-center"
              style="width: 13%"
              v-else
            >
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                style="width: 80%"
                v-model="order.statusModel"
              >
                <option>未出貨</option>
                <option>已出貨</option>
                <option>已取貨</option>
                <option>已取消訂單</option>
                <option>已退貨</option>
              </select>
            </div>
            <div class="text-left d-flex align-self-center">
              <div
                class="btn btn-outline-secondary mr-3"
                @click="order.showoederdetail = !order.showoederdetail"
              >
                查看細項
              </div>
              <div v-if="order.edit === false">
                <div
                  class="btn btn-outline-success mr-3"
                  @click="order.edit = true"
                >
                  編輯
                </div>
                <div class="btn btn-outline-danger" @click="del(order, index)">
                  刪除
                </div>
              </div>
              <div v-else>
                <div class="btn btn-outline-success mr-3" @click="save(order)">
                  保存
                </div>
                <div class="btn btn-outline-danger" @click="cancel(order)">
                  取消
                </div>
              </div>
            </div>
          </div>
          <div
            class="user_item_connect row m-0 w-100 border-top bg-white"
            v-show="order.showoederdetail"
          >
            <div class="col-8 p-1">
              <div
                class="d-flex m-3 item_products"
                v-for="item in order.products"
                :key="item._id"
                @click="goDetail(item._id)"
              >
                <div class="pic" style="width: 10%">
                  <img :src="item.src" alt="" />
                </div>
                <div class="name ml-5" style="width: 25%">{{ item.name }}</div>
                <div class="quantity" style="width: 25%">
                  X{{ item.quantity }}
                </div>
                <div class="price" style="width: 25%">{{ item.price }}</div>
              </div>
            </div>
            <div class="col-4 border-left my-2">
              <div
                class="item_connect d-flex flex-column justify-content-center align-items-start"
              >
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ControlOder',
  data () {
    return {
      allorders: [],
      changelist: false,
      filter: ''
    }
  },
  computed: {
    orderfilter () {
      if (this.filter === '') {
        return this.allorders
      } else {
        return this.allorders.filter(e => {
          return e.item === this.filter
        })
      }
    }
  },
  methods: {
    getallorder () {
      this.axios.get(process.env.VUE_APP_API + '/orders').then(res => {
        this.allorders = res.data.result.map(item => {
          item.payModel = item.pay
          item.statusModel = item.status
          item.showoederdetail = false
          item.edit = false
          return item
        })
      })
    },
    liststatus () {
      this.allorders = this.allorders.reverse()
      if (this.changelist) {
        this.changelist = false
      } else {
        this.changelist = true
      }
    },
    edit (order) {
      order.edit = true
    },
    save (order) {
      this.axios
        .patch(process.env.VUE_APP_API + '/orders/' + order.item, {
          pay: order.payModel,
          status: order.statusModel
        })
        .then(res => {
          order.edit = false
          order.pay = order.payModel
          order.status = order.statusModel
          this.$alert.success('更新成功')
        })
        .catch(error => {
          this.$alert.error(error.response.data.message)
        })
    },
    cancel (order) {
      order.payModel = order.pay
      order.statusModel = order.status
      order.edit = false
    },
    del (order, index) {
      this.axios
        .delete(process.env.VUE_APP_API + '/orders/' + order.item)
        .then(res => {
          if (res.data.success) {
            this.orderfilter.splice(index, 1)
            const idx = this.allorders.indexOf(order)
            this.allorders.splice(idx, 1)
            this.$alert.success('刪除成功')
          } else {
            this.$alert.error(res.data.message)
          }
        })
        .catch(error => {
          this.$alert.error(error.response.data.message)
        })
    }
  },
  created () {
    this.getallorder()
  }
}
</script>
<style lang="stylus" scoped>
.orders_item{
  border-radius 20px
  margin-bottom 20px
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
.search{
  border 1px solid rgba(0,0,0,0.2)
  border-radius 20px
  padding-left 10px
  height 35px
  &:focus{
    outline none
    box-shadow 0 0 10px var(--black1)
  }
}
</style>
