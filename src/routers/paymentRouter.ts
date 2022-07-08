import Router from 'express'
import { postPayment } from '../controllers/paymentController.js'
import { cardExists, confirmPassword, isUnexpired } from '../middlewares/cardValidation.js'

const paymentRouter =Router()

paymentRouter.post('/payment/:cardId/:businessId', cardExists , confirmPassword , isUnexpired , postPayment )

export default paymentRouter