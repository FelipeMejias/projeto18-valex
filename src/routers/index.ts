import Router from 'express'
import paymentRouter from './paymentRouter.js'
import cardRouter from './cardRouter.js'
import rechargeRouter from './rechargeRouter.js'

const router:any =Router()
router.use(cardRouter)
router.use(rechargeRouter)
router.use(paymentRouter)

export default router