import express from 'express'

import { createOrder, getallOrders, editOrders, deletee, getuserOrders, askQuestion, replyQuestion } from '../controllers/order.js'

const router = express.Router()

router.post('/', createOrder)

router.get('/', getallOrders)

router.patch('/:item', editOrders)

router.delete('/:item', deletee)

router.get('/:account', getuserOrders)

router.patch('/ask/:item', askQuestion)

router.patch('/reply/:item', replyQuestion)

// router.patch('/:item', updateOrder)

// router.delete('/:item', deleteOrder)

export default router
