import express from 'express'
import { create, edit, deletee, getAllProducts, productId, getImage } from '../controllers/products.js'

const router = express.Router()

router.post('/', create)
router.patch('/:id', edit)
router.delete('/:id', deletee)
router.get('/', getAllProducts)
router.get('/product/:productId', productId)
router.get('/images/:file', getImage)

export default router
