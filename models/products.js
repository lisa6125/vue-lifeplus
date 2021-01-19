import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productImageSchema = new Schema({
  file: {
    type: String
  },
  display: {
    type: Boolean
  }
})

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, '缺少商品名稱欄位']
    },
    type: {
      type: String,
      required: [true, '缺少商品種類欄位']
    },
    price: {
      type: Number,
      required: [true, '缺少商品價格']
    },
    quantity: {
      type: Number,
      required: [true, '缺少商品數量']
    },
    onsale: {
      type: Boolean,
      required: [true, '缺少是否上架']
    },
    description: {
      type: String,
      maxlength: [1000, '說明必須 1000 字以下'],
      required: [true, '缺少商品說明']
    },
    images: {
      type: [productImageSchema]
    }
  },
  {
    versionKey: false
  }
)

const products = mongoose.model('products', productSchema)

export default products
