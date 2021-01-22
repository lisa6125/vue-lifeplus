import express from 'express'
import { create, getAllShares, poster, getImage, deletee, editshare } from '../controllers/share.js'

const router = express.Router()

router.post('/', create)
router.patch('/:_id', editshare)
router.delete('/:_id', deletee)
router.get('/', getAllShares)
router.get('/share/:account', poster)
router.get('/images/:file', getImage)

export default router
