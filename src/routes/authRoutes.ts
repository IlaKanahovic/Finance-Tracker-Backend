import { Router } from 'express'
import { register, login } from '../controllers/authController'
import { changeName } from '../controllers/userController'
import { verifyToken } from '../middleware/authMiddleware'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.patch('/user', verifyToken ,changeName)

export default router