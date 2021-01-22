import multer from 'multer'
import path from 'path'
import fs from 'fs'

import shares from '../models/share.js'

// 上傳檔案的儲存設定
const storage = multer.diskStorage({
  // req 請求
  // file 檔案資訊
  // callback 處理的 function
  destination (req, file, callback) {
    // callback(null, 資料夾)
    callback(null, './images/')
  },
  async filename (req, file, callback) {
    let filename = Date.now() + path.extname(file.originalname)
    const filepath = process.cwd() + '/images/' + filename
    const exists = fs.existsSync(filepath)
    console.log(filepath, exists)
    if (exists) {
      filename = Date.now() + '1' + path.extname(file.originalname)
    }
    // callback(null, 檔名)
    // 時間當檔名 + 原上傳檔案的副檔名
    callback(null, filename)
  }
})

// 上傳設定
const upload = multer({
  storage,
  // 過濾檔案
  fileFilter (req, file, callback) {
    if (file.mimetype.includes('image')) {
      callback(null, true)
    } else {
      // 回應一個 multer 錯誤
      // 因為套件觸發的錯誤類型是 MulterError
      // 觸發跟套件一樣的錯誤類型保持格式統一，就不用另外寫判斷是哪種錯誤，也能直接知道是上傳發生的錯誤
      // LIMIT_FORMAT 是自訂錯誤 CODE，和內建的格式統一
      callback(new multer.MulterError('LIMIT_FORMAT'), false)
    }
  },
  limits: {
    // 大小限制 1MB
    // 單位是 B
    // 1KB = 1024B
    // 1MB = 1024KB
    fileSize: 1024 * 1024
  }
})

export const create = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不符1' })
    return
  }

  upload.array('file', 1)(req, res, async error => {
    if (error instanceof multer.MulterError) {
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '格式不符'
      } else {
        message = '上傳錯誤'
      }

      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
      console.log(error)
    } else {
      try {
        const file = []
        if (process.env.DEV === 'true') {
          req.files.forEach(item => {
            file.push({ file: item.filename, display: true })
          })
        } else {
          req.files.forEach(item => {
            file.push({ file: path.basename(item.path), display: true })
          })
        }
        const result = await shares.create({
          poster: req.body.poster,
          title: req.body.title,
          onshare: req.body.onshare,
          images: file
        })
        res.status(200).send({ success: true, message: '', result })
      } catch (error) {
        if (error.name === 'ValidationError') {
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400).send({ success: false, message })
        } else {
          res.status(500).send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
}

export const editshare = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    console.log('123')
    let result = await shares.findById(req.params._id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (req.session.user.right) {
      result = await shares.findByIdAndUpdate(req.params._id, req.body, { new: true })
      res.status(200).send({ success: true, message: '', result })
    } else {
      res.status(403).send({ success: false, message: '沒有權限' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const deletee = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }

  try {
    let result = await shares.findById(req.params._id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await shares.findByIdAndDelete(req.params._id)
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getAllShares = async (req, res) => {
  try {
    const result = await shares.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '發生錯誤' })
  }
}

export const poster = async (req, res) => {
  try {
    const result = await shares.find({ poster: req.params.account })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getImage = async (req, res) => {
  const path = process.cwd() + '/images/' + req.params.file
  const exists = fs.existsSync(path)

  if (exists) {
    res.status(200).sendFile(path)
  } else {
    res.status(404).send({ success: false, message: '找不到檔案' })
  }
}
