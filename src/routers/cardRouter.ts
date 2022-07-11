import Router from 'express'
import { activateCard, blockCard, getCardDetails, postCard, unblockCard } from '../controllers/cardController.js'
import { cardExists, confirmPassword, isUnexpired } from '../middlewares/cardValidation.js'
import { companyApiValidation } from '../middlewares/companyApiValidation.js'
import { employeeValidation } from '../middlewares/employeeValidation.js'

const cardRouter =Router()

cardRouter.post('/card', companyApiValidation , employeeValidation, postCard )

cardRouter.post('/card/:cardId/activate', cardExists , activateCard )

//cardRouter.get('/card/:employeeId', getCardDetails)

cardRouter.get('/card/:cardId', cardExists , getCardDetails)

cardRouter.post('/card/:cardId/block', cardExists , confirmPassword , isUnexpired , blockCard)

cardRouter.post('/card/:cardId/unblock', cardExists , confirmPassword , isUnexpired , unblockCard)

export default cardRouter