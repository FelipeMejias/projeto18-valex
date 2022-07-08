import Router from 'express'
import { activateCard, postCard } from '../controllers/cardController.js'
import { cardExists, confirmPassword, isUnexpired } from '../middlewares/cardValidation.js'
import { companyApiValidation } from '../middlewares/companyApiValidation.js'
import { employeeValidation } from '../middlewares/employeeValidation.js'

const cardRouter =Router()

cardRouter.post('/card', companyApiValidation , employeeValidation, postCard )

cardRouter.post('/card/:id/activate', cardExists , activateCard )

cardRouter.get('/card')

cardRouter.get('/card/transactions')

cardRouter.post('/card/:id/block', cardExists , confirmPassword , isUnexpired )

cardRouter.post('/card/:id/unblock', cardExists , confirmPassword , isUnexpired)

export default cardRouter