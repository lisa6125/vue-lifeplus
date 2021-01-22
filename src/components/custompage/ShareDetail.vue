<template>
<div id="ShareDetail" class="text-center px-md-5" style="padding-top:100px">
  <p style="font-size:2rem">你的分享</p>
  <div class="container-fluid px-md-5">
    <div class="row w-100 mb-4 pb-3">
      <div class="col-6 p-0 col-md-2 text-left">
        <b-button v-b-modal.modal-center>分享</b-button>
        <b-modal id="modal-center" centered title="來分享你的生活吧!">
            <form>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">分享描述</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="description"></textarea>
              </div>
              <div class="form-group">
                <label class="btn btn-info">
                  <input style="display:none;"
                  type="file"
                  :max-size="1024"
                  exceedSizeText="檔案大小不能超過"
                  accept="image/*"
                  name="file"
                  ref="fileInput"
                  @change="uploadFile">
                  <font-awesome-icon :icon="['fas','folder-plus']" size="lg"></font-awesome-icon> 上傳圖片
                </label>
                <br>
                <div id="showpic" v-for="url in priviewPic" :key="url">
                  <img :src="url"
                    :key="url" alt="">
                </div>
              </div>
              <div class="btn btn-success float-right" @click="submit">送出</div>
            </form>
        </b-modal>
      </div>
      <div class="col-0 col-md-8">
      </div>
      <div class="col-6 p-0 col-md-2 text-right">
          <div class="btn btn-outline-secondary" v-if="changelist" @click="liststatus()">現在是新到舊</div>
          <div class="btn btn-outline-secondary" v-else @click="liststatus()">現在是舊到新</div>
      </div>
    </div>
    <div class="contain-fluid">
        <div v-masonry="containerId" transition-duration="0.3s" item-selector=".item">
          <div v-masonry-tile class="item" v-for="(item,idx) in shares" :key="item._id" >
            <div class="share-item">
              <div class="share-pic">
                <img :src="item.src" alt="">
              </div>
              <div class="share-text">
                <div class="box">
                  <span class="mr-2">分享內容</span>
                  <p>{{item.title}}</p>
                </div>
              </div>
              <div class="share-status text-left align-self-center my-3">
                <span class="ml-3 mr-2">狀態:</span>
                {{item.onshare}}
                <div class="btn btn-outline-danger ml-5" @click="del(item,idx)">刪除</div>
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
  name: 'ShareDetail',
  data () {
    return {
      description:'',
      file: null,
      priviewPic: [],
      image: [],
      shares:[]
    }
  },
  methods: {
    uploadFile () {
      this.image = []
      this.priviewPic = []
      for (const i of this.$refs.fileInput.files) {
        if (i.size > 1024 * 1024) {
          this.image = []
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '圖片太大'
          })
        } else if (!i.type.includes('image')) {
          this.image = []
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '檔案格式錯誤'
          })
        } else {
          this.image.push(i)
        }
      }
      // console.log(this.image)
      // console.log(typeof this.image)
      for (let i = 0; i < this.image.length; i++) {
        this.priviewPic.push(URL.createObjectURL(this.image[i]))
        // console.log(this.image[i])
      }
      // console.log(this.priviewPic)
    },
    submit () {
      const fd = new FormData()
      fd.append('poster', this.$store.state.user.account)
      fd.append('title', this.description)
      fd.append('onshare', '等待審核')
      this.image.forEach((item) => {
        fd.append('file', item)
      })
      this.axios
        .post(process.env.VUE_APP_API + '/shares/', fd)
        .then(
          (res) => {
            res.data.result.src = process.env.VUE_APP_API + '/shares/images/' + res.data.result.images[0].file
            this.shares.push(res.data.result)
            this.$alert.success('上傳成功')
            this.description = ''
            this.priviewPic = []
          }
        )
        .catch((err) => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })
    },
    getshares () {
      this.axios.get(process.env.VUE_APP_API + '/shares/share/' + this.$store.state.user.account)
      .then(res => {
        this.shares = res.data.result.map(e=>{
          e.src = process.env.VUE_APP_API + '/shares/images/' + e.images[0].file
          return e
        })
      })
    },
    del (item,idx) {
      this.axios
        .delete(process.env.VUE_APP_API + '/shares/' + item._id)
        .then((res) => {
          if (res.data.success) {
            this.shares.splice(idx, 1)
            this.$alert.success('刪除成功')
          } else {
            this.$alert.error(res.data.message)
          }
        })
        .catch((error) => {
          this.$alert.error(error.response.data.message)
        })
    }
  },
  created () {
    this.getshares()
  }
}
</script>

<style lang="stylus" scoped>
  .item{
    margin 0 auto
    width 300px
    padding 10px
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
.share-item{
  border 3px solid var(--brown1)
  border-radius 10px
  &:hover{
    box-shadow 0 0 20px 10px rgba(0,0,0,0.1)
    transform translate(0,-10px)
    transition 0.3s ease
  }
}
.share-pic{
  overflow hidden
  img{
    width 100%
    height 100%
    object-fit contain
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