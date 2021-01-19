import orders from '../models/order.js'

export const createOrder = async (req, res) => {
  // 檢查是不是有效的訂單
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  try {
    const result = await orders.create(
      {
        item: req.body.item,
        account: req.body.account,
        connect: req.body.connect,
        products: req.body.products,
        total: req.body.total,
        payment: req.body.payment,
        pay: req.body.pay,
        status: req.body.status,
        ask: req.body.ask,
        askstatus: req.body.askstatus
      }
    )
    res.status(200)
    res.send({ success: true, message: '', result })
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
export const getallOrders = async (req, res) => {
  try {
    const result = await orders.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const getuserOrders = async (req, res) => {
  try {
    const result = await orders.find({ account: req.params.account })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const editOrders = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    let result = await orders.findOne({ item: req.params.item })
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (req.session.user.right) {
      result = await orders.findOneAndUpdate({ item: req.params.item }, req.body, { new: true })
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
    let result = await orders.findOne({ item: req.params.item })
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (req.session.user.right) {
      result = await orders.findOneAndDelete({ item: req.params.item })
      res.status(200).send({ success: true, message: '', result })
    } else {
      res.status(403).send({ success: false, message: '沒有權限' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
export const askQuestion = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  try {
    await orders.findOneAndUpdate({ item: req.params.item }, { $push: { ask: '問:' + req.body.userask } }, { new: true })
    const result = await orders.findOneAndUpdate({ item: req.params.item }, { askstatus: req.body.askstatus }, { new: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const replyQuestion = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  try {
    await orders.findOneAndUpdate({ item: req.params.item }, { $push: { ask: '回覆:' + req.body.reply } }, { new: true })
    const result = await orders.findOneAndUpdate({ item: req.params.item }, { askstatus: req.body.askstatus }, { new: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
    console.log(error)
  }
}
