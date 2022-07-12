import { Request, Response } from "express";
import { createCard , activateCardWithPassword, changeToBlockCard, changeToUnblockCard, getCardDetailsById } from "../services/cardService.js";

export async function postCard(req:Request,res:Response){
    const {type}=req.body
    const {employee}=res.locals
    const {securityCode}=await createCard(employee,type)
    res.status(200).send({securityCode})
}

export async function getCardDetails(req:Request,res:Response){
    const {card} = res.locals
    const cardDetails = await getCardDetailsById(card.id)
    res.send(cardDetails)
}

export async function activateCard(req:Request,res:Response){
    const {card}=res.locals
    const {password,securityCode}=req.body
    await activateCardWithPassword(card,password,securityCode)
    res.sendStatus(200)
}

export async function blockCard(req:Request,res:Response){
    const {card}=res.locals
    await changeToBlockCard(card)
    res.sendStatus(200)
}

export async function unblockCard(req:Request,res:Response){
    const {card}=res.locals
    await changeToUnblockCard(card)
    res.sendStatus(200)
}