import express from 'express'
import authController from '../controllers/authController.js'
import { checkSchema } from 'express-validator'
import { userRegisterSchema, userLoginSchema } from '../validators/authValidator.js'

const router = express.Router()

router.post('/register', checkSchema(userRegisterSchema), authController.register)
router.post('/login', checkSchema(userLoginSchema), authController.login)

export default router;