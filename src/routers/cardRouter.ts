import Router from 'express'
import { postCard } from '../controllers/cardController.js'
import { companyApiValidation } from '../middlewares/companyApiValidation.js'
import { employeeValidation } from '../middlewares/employeeValidation.js'

const cardRouter =Router()

cardRouter.post('/card', companyApiValidation , employeeValidation, postCard )


export default cardRouter