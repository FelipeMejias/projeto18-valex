import { Request, Response } from "express"
import { createRecharge } from "../services/rechargeService"

export async function recharge(req:Request,res:Response){
    const {amount}:{amount:number}=req.body
    const {card}=res.locals
    await createRecharge(card,amount)
    res.sendStatus(200)
}
