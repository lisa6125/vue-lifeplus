import mongoose from 'mongoose'

const Schema = mongoose.Schema

const orderSchema = new Schema({
  // 訂單資料
  item: {
    type: String,
    unique: '編號重複',
    required: [true, '沒有訂單編號']
  },
  account: {
    type: String,
    required: [true, '沒有會員帳號']
  },
  connect: {
    type: Object,
    required: [true, '沒聯絡資料']
  },
  products: {
    type: Object,
    required: [true, '沒有商品']
  },
  total: {
    type: Number,
    required: [true, '沒有應付款價錢']
  },
  payment: {
    type: String,
    required: [true, '沒有付款方式']
  },
  pay: {
    type: String,
    required: [true, '付款狀態']
  },
  status: {
    type: String,
    required: [true, '沒有出貨狀況']
  },
  ask: {
    type: Object
  },
  askstatus: {
    type: String
  }
})

const orders = mongoose.model('orders', orderSchema)

export default orders
