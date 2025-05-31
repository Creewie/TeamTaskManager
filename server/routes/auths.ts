import express, { Router } from 'express'
import { registerHandler, loginHandler, registerValidation, loginValidation } from '../controllers/authController'

const router: Router = express.Router()

router.post('/register', registerValidation, registerHandler)
router.post('/login', loginValidation, loginHandler)

export default router