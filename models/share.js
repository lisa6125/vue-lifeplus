import mongoose from 'mongoose'

const Schema = mongoose.Schema

const shareImageSchema = new Schema({
  file: {
    type: String
  }
})

const shareSchema = new Schema(
  {
    poster: {
      type: String,
      required: [true, '缺少用戶']
    },
    title: {
      type: String,
      required: [true, '缺少說明']
    },
    onshare: {
      type: String,
      required: [true, '缺少是否上架']
    },
    images: {
      type: [shareImageSchema]
    }
  },
  {
    versionKey: false
  }
)

const shares = mongoose.model('shares', shareSchema)

export default shares
