<template>
  <div id="Share" class="container-fluid p-5">
    <div class="row mx-5 px-5 pb-4 border-bottom border-dark">
      <h5 class="col-7">分享管理</h5>
      <div class="col-5 text-right">
        <div class="btn btn-outline-secondary mr-3" @click="filter = '全部'">
          全部
        </div>
        <div
          class="btn btn-outline-secondary mr-3"
          @click="filter = '等待審核'"
        >
          未審核
        </div>
        <div
          class="btn btn-outline-secondary mr-3"
          @click="filter = '審核通過'"
        >
          審核通過
        </div>
        <div
          class="btn btn-outline-secondary mr-3"
          @click="filter = '審核不通過'"
        >
          審核不通過
        </div>
      </div>
    </div>
    <div class="share-view">
      <div
        v-masonry="containerId"
        transition-duration="0.3s"
        item-selector=".item"
      >
        <div
          v-masonry-tile
          class="item"
          v-for="(item, index) in sharefilter"
          :key="index"
        >
          <div class="post border">
            <p>{{ item.poster }}</p>
            <img :src="item.src" v-pswp="item" alt="" />
            <div class="share-text">
              <div class="box">
                <span class="mr-2">分享內容</span>
                <p>{{ item.title }}</p>
              </div>
            </div>
            <div class="status my-3" v-if="item.edit">
              <select name="" id="" v-model="item.onsharemodel">
                <option value="狀態">狀態</option>
                <option value="等待審核">等待審核</option>
                <option value="審核通過">審核通過</option>
                <option value="審核不通過">審核不通過</option>
              </select>
            </div>
            <div class="status my-3" v-else>目前為:{{ item.onshare }}</div>
            <div class="edit_del">
              <div
                class="btn btn-outline-warning mr-2"
                @click="cancel(item)"
                v-if="item.edit"
              >
                取消
              </div>
              <div
                class="btn btn-outline-success mr-2"
                @click="item.edit = true"
                v-else
              >
                編輯
              </div>
              <div
                class="btn btn-outline-success mr-2"
                @click="save(item, idx)"
                v-if="item.edit === true"
              >
                保存
              </div>
              <div class="btn btn-outline-danger" @click="del(item, idx)">
                刪除
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
  name: 'ControlShare',
  data() {
    return {
      shares: [],
      filter: '全部',
    }
  },
  computed: {
    sharefilter() {
      if (this.filter === '全部') {
        return this.shares
      } else {
        return this.shares.filter(e => {
          return e.onshare === this.filter
        })
      }
    },
  },
  methods: {
    getshares() {
      this.axios.get(process.env.VUE_APP_API + '/shares/').then(res => {
        this.shares = res.data.result.map(e => {
          e.src = process.env.VUE_APP_API + '/shares/images/' + e.images[0].file
          e.onsharemodel = e.onshare
          e.edit = false
          return e
        })
      })
    },
    del(item, idx) {
      this.axios
        .delete(process.env.VUE_APP_API + '/shares/' + item._id)
        .then(res => {
          if (res.data.success) {
            this.sharefilter.splice(idx, 1)
            let index = this.shares.indexOf(item)
            this.shares.splice(index, 1)
            this.$alert.success('刪除成功')
          } else {
            this.$alert.error(res.data.message)
          }
        })
        .catch(error => {
          this.$alert.error(error.response.data.message)
        })
    },
    cancel(item) {
      item.onsharemodel = item.onshare
      item.edit = false
    },
    save(item, idx) {
      item.onshare = item.onsharemodel
      this.axios
        .patch(process.env.VUE_APP_API + '/shares/' + item._id, {
          onshare: item.onsharemodel,
        })
        .then(res => {
          console.log(res.data.result)
          this.shares[idx] = res.data.result
          item.edit = false
        })
        .catch(error => {
          console.log(error)
          this.$alert.error(error.response.data.message)
        })
    },
  },
  created() {
    this.getshares()
  },
}
</script>

<style lang="stylus" scoped>
.share-view{
  padding 5%
  @media screen and (max-width:1600px) {
    padding 100px 50px 50px 50px
    background-position center center
  }
  .item{
    margin 0 auto
    width 25%
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
.share-text{
  .box{
    color white
    font-size 1.2rem
    background var(--brown3)
    padding: 10px;
    height 100%
    margin 0 auto
    p{
      word-wrap:break-word
    }
  }
}
</style>
