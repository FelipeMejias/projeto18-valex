import Router from 'express'
import buyRouter from './buyRouter.js'
import cardRouter from './cardRouter.js'
import rechargeRouter from './rechargeRouter.js'

const router:any =Router()
router.use(cardRouter)
router.use(rechargeRouter)
router.use(buyRouter)

export default router