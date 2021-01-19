import express from 'express'
import { create, edit, login, logout, heartbeat, getuser } from '../controllers/users.js'

const router = express.Router()

router.post('/', create)
router.patch('/:_id', edit)
router.post('/login', login)
router.get('/getuser/:_id', getuser)
router.delete('/logout', logout)
router.get('/heartbeat', heartbeat)

export default router
