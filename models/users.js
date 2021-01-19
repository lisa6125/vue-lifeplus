import mongoose from 'mongoose'

const Schema = mongoose.Schema

// const shareSchema = new Schema({
//   poster: {
//     type: String
//   },
//   content: {
//     type: String
//   },
//   file: {
//     type: String
//   },
//   launch: {
//     type: Boolean
//   }
// })

const userSchema = new Schema({
  name: {
    type: String
  },
  account: {
    type: String,
    minlength: [4, '帳號必須四字以上'],
    maxlength: [20, '帳號必須二十字以下'],
    unique: true,
    required: '帳號必填'
  },
  password: {
    type: String,
    required: [true, '請輸入密碼']
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  birth: {
    type: String
  },
  gender: {
    type: String
  },
  right: {
    type: Boolean,
    required: false
  }
},
{
  versionKey: false
}
)

const users = mongoose.model('users', userSchema)
export default users
