<template lang="pug">
  b-container.px-5#Controlproducts.mt-4(fluid)
    b-row.border-bottom.border-secondary.mx-5.px-5
      b-col.p-3.d-flex.justify-content-between(cols="12")
        h5.m-0.d-inline-block 商品管理
        b-button(v-b-modal.modal-1)
          font-awesome-icon(:icon="['fas','plus']" size="lg")
        b-modal(id="modal-1" size="lg" title="新增商品" ok-only)
          b-form.d-flex.flex-wrap.w-100(@submit.prevent="onSubmit")
            b-form-group#input-group-1.mr-auto(
              label="商品名稱",
              label-for="input-1",
            )
              b-form-input#input-1(
                v-model="productName",
                type="text",
                placeholder="請輸入商品名稱"
              )
            b-form-group#input-group-2(
              label="商品類別",
              label-for="input-2",
            )
              b-form-input#input-2(
                v-model="type",
                type="text",
                placeholder="請輸入商品類別"
              )
            b-form-group#input-group-3.w-md-25(
              label="商品價錢",
              label-for="input-3"
            )
              b-form-input#input-3(
                v-model="price",
                type="number"
              )
            b-form-group#input-group-6(
              label="商品數量",
              label-for="input-6"
            )
              b-form-input#input-6(
                v-model="quantity",
                type="number"
              )
            b-form-group#input-group-4.mx-2(label="是否上架" v-slot="{ 是否上架 }")
              b-form-radio(v-model="onsale" :aria-describedby="是否上架" name="some-radios" value="true") 是
              b-form-radio(v-model="onsale" :aria-describedby="是否上架" name="some-radios" value="false") 否
            b-form-group#input-group-5(
              label="商品說明",
              label-for="input-5",
              description="最多1000個字",
              invalid-feedback="格式不符"
            )
              b-form-textarea#input-5(
                v-model="description",
                type="text",
                placeholder="請輸入商品說明...",
                :state="descState"
              )
            b-form-group#input-group-6.w-100.border-top.pt-3
              <label class="btn btn-info">
              input#imagArr.mx-auto(
                style="display:none;",
                type="file",
                :max-size="1024",
                exceedSizeText="檔案大小不能超過",
                accept="image/*",
                multiple,
                name="file",
                ref="fileInput",
                @change="uploadFile"
              )
              <font-awesome-icon :icon="['fas','folder-plus']" size="lg"></font-awesome-icon> 上傳圖片
              </label>
              br
              #showpic_all.d-flex.flex-wrap.w-100
                #showpic.m-1(
                    v-for="(url,index) in priviewPic",
                    :key="url")
                  img(
                    :src="url",
                    :key="url",
                    max-width="100")
            br
            br
            b-btn.subbtn.ml-auto(type="submit", variant="success") 送出
    b-row.mx-5.px-5
        b-col.mb-2(cols="12")
          table(width="100%")
            tr
              td.text-center(width="9%") 照片
              td(width="15%") 產品名稱
              td(width="15%") 分類
              td(width="14%") 售價
              td(width="15%") 數量
              td(width="16%") 是否上架
              td
    b-row.mx-5.px-5
        b-col.mb-2.product_item(
          cols="12",
          v-for="(product, idx) in products",
          :key="product._id"
        )
          b-card(width='100%')
            img.align-self-center.float-left.mr-4(:src="product.src", v-pswp="image",img-left)
            .productright.d-inline-block
              .productbox(v-if="product.edit")
                table(width="100%")
                  tr
                    td.px-4(width="120")
                      h5 商品名稱:
                      b-form-input(type="text", v-model="product.productNameModel",width="80%")
                    td.px-4(width="120")
                      p 商品種類:
                      b-form-input( type="text", v-model="product.typeModel")
                    td.px-4(width="100")
                      p 價格:
                      b-form-input( type="number", v-model="product.priceModel",:state="descState")
                    td.px-4(width="100")
                      p 數量:
                      b-form-input( type="number", v-model="product.quantityeModel",:state="descState")
                    td.px-4(width="80")
                      b-form-group#input-group-4(label="是否上架" v-slot="{ 是否上架 }")
                        b-form-radio(v-model="product.onsaleModel" :aria-describedby="是否上架" name="some-radios" value="true") 是
                        b-form-radio(v-model="product.onsaleModel" :aria-describedby="是否上架" name="some-radios" value="false") 否
                    td.px-4(width="80")
                      div(v-if="product.edit")
                        b-btn.m-1.float-right(
                          variant="outline-danger",
                          @click="cancel(product)"
                        ) 取消
                        b-btn.m-1.float-right( variant="outline-success", @click="save(product)") 保存
                  tr
                    td.px-4(colspan="3")
                      p 商品描述:
                      b-form-textarea(type="text", v-model="product.descriptionModel")
              .productbox(v-else)
                table(width="100%")
                  tr
                    td(width="16%") {{ product.productName }}
                    td(width="16%") {{ product.type }}
                    td(width="16%") {{ product.price | thousands }}
                    td(width="16%") {{ product.quantity }}
                    td(width="16%") {{ product.onsale }}
                    td(width="16%")
                      div(v-if="!product.edit")
                        b-btn(variant="outline-secondary" @click='product.showDetail = !product.showDetail') 細項
                        b-btn.m-1(
                          variant="outline-success",
                          @click="edit(product)"
                        ) 編輯
                        b-btn.m-1(
                          variant="outline-danger",
                          @click="del(product, idx)"
                        ) 刪除
            .showProductDetail.border-top.mt-5.mx-3(:class= "{show_Detail:product.showDetail}")
              h5.my-3 商品描述:
              span(v-if='product.edit === false') {{ product.description }}
              .allpic.d-flex.flex-wrap.mt-5
                div.pic.mx-2(v-for='item in product.images')
                  img(:src='"http://localhost:3000/products/images/"+item.file')
</template>

<script>
export default {
  name: 'ControlProduct',
  data() {
    return {
      productName: '',
      type: '',
      price: '',
      onsale: '',
      description: '',
      quantity: '',
      file: null,
      products: [],
      priviewPic: [],
      image: [],
    }
  },
  computed: {
    descState() {
      if (this.description.length === 0) {
        return null
      } else if (this.description.length > 1000) {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    onSubmit() {
      const fd = new FormData()
      fd.append('productName', this.productName)
      fd.append('type', this.type)
      fd.append('price', this.price)
      fd.append('quantity', this.quantity)
      fd.append('onsale', this.onsale)
      fd.append('description', this.description)
      this.image.forEach(item => {
        fd.append('file', item)
      })
      this.axios
        .post(process.env.VUE_APP_API + '/products/', fd)
        .then(res => {
          res.data.result.src =
            process.env.VUE_APP_API +
            '/products/images/' +
            res.data.result.images[0].file
          res.data.result.productNameModel = res.data.result.productName
          res.data.result.typeModel = res.data.result.type
          res.data.result.priceModel = res.data.result.price
          res.data.result.quantityeModel = res.data.result.quantity
          res.data.result.onsaleModel = res.data.result.onsale
          res.data.result.descriptionModel = res.data.result.description
          res.data.result.edit = false
          res.data.result.showDetail = false
          delete res.data.result.file
          this.products.push(res.data.result)
          this.image = []
          this.description = ''
          this.productName = ''
          this.type = ''
          this.price = ''
          this.quantity = ''
          this.onsale = ''
          this.description = ''
          console.log(res)
          this.$swal({
            icon: 'success',
            title: '新增商品成功',
          })
          this.priviewPic = []
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message,
          })
        })
    },
    cancel(product) {
      product.edit = false
      product.productNameModel = product.productName
      product.typeModel = product.type
      product.priceModel = product.price
      product.quantityeModel = product.quantity
      product.onsaleModel = product.onsale
      product.descriptionModel = product.description
    },
    save(product) {
      this.axios
        .patch(process.env.VUE_APP_API + '/products/' + product._id, {
          productName: product.productNameModel,
          type: product.typeModel,
          price: product.priceModel,
          quantity: product.quantityeModel,
          onsale: product.onsaleModel,
          description: product.descriptionModel,
        })
        .then(res => {
          product.edit = false
          product.title = product.model
          product.productName = product.productNameModel
          product.type = product.typeModel
          product.price = product.priceModel
          product.quantity = product.quantityeModel
          product.onsale = product.onsaleModel
          product.description = product.descriptionModel
          this.$alert.success('更新成功')
        })
        .catch(error => {
          this.$alert.error(error.response.data.message)
        })
    },
    edit(product) {
      product.edit = true
    },
    del(product, idx) {
      this.axios
        .delete(process.env.VUE_APP_API + '/products/' + product._id)
        .then(res => {
          if (res.data.success) {
            this.products.splice(idx, 1)
            this.$alert.success('刪除成功')
          } else {
            this.$alert.error(res.data.message)
          }
        })
        .catch(error => {
          this.$alert.error(error.response.data.message)
        })
    },
    uploadFile() {
      this.image = []
      this.priviewPic = []
      for (const i of this.$refs.fileInput.files) {
        if (i.size > 1024 * 1024) {
          this.image = []
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '圖片太大',
          })
        } else if (!i.type.includes('image')) {
          this.image = []
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '檔案格式錯誤',
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
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/products/')
      .then(res => {
        this.products = res.data.result.map(product => {
          if (product.images.length > 0) {
            product.src =
              process.env.VUE_APP_API +
              '/products/images/' +
              product.images[0].file
          }
          product.productNameModel = product.productName
          product.typeModel = product.type
          product.priceModel = product.price
          product.quantityeModel = product.quantity
          product.onsaleModel = product.onsale
          product.descriptionModel = product.description
          product.edit = false
          product.showDetail = false
          delete product.file
          return product
        })
      })
      .catch(error => {
        console.log(error)
        this.$alert.error(error.response.data.message)
      })
  },
}
</script>

<style lang="stylus">
#Controlproducts{
  width 100%
  .modal-content{
    width 500px
  }
}
  #input-group-1{
    width 45%
    @media screen and (max-width: 768px){
      width 100%
    }
  }
  #input-group-2{
    width 45%
    @media screen and (max-width: 768px){
      width 100%
    }
  }
  #input-group-5{
    width 100%
    @media screen and (max-width: 768px){
      width 60%
    }
  }
  #input-group-3{
    width 30%
    margin-right 5%
    @media screen and (max-width: 768px){
      width 45%
    }
  }
  #input-group-6{
    width 30%
    margin-right 5%
    @media screen and (max-width: 768px){
      width 50%
      margin-right 0
    }
  }
  .subbtn{
    height 40px
  }
  #showpic img{
    width 200px
  }
  .showProductDetail{
    display none
    width 80%
  }
  .modal-footer{
    display none
  }
  .show_Detail{
    display block
  }
  .card-body img
    width 5%
  .pic{
    width 18%
    img{
      width 100%
    }
  }
  .productright
    width 92%
    border-left 5px solid rgba(91, 53, 32, 0.5)
    padding-left 15px
</style>
