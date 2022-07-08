import Router from 'express'
import { recharge } from '../controllers/rechargeController.js'
import { cardExists, isUnexpired } from '../middlewares/cardValidation.js'
import { companyApiValidation } from '../middlewares/companyApiValidation.js'

const rechargeRouter =Router()

rechargeRouter.post('/recharge/:cardId', companyApiValidation , cardExists , isUnexpired , recharge )

export default rechargeRouter