import { Request, Response } from "express"
import { createPayment } from "../services/paymentService.js"

export async function postPayment(req:Request,res:Response){
    const {amount}:{amount:number}=req.body
    const {card}=res.locals
    const {businessId}=req.params
    await createPayment( card , parseInt(businessId) , amount )
    res.sendStatus(200)
}
