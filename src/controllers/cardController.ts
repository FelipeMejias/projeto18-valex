import { Request, Response } from "express";
import { createCard , activateCardWithPassword } from "../services/cardService.js";

export async function postCard(req:Request,res:Response){
    const {type}=req.body
    const {employee}=res.locals
    createCard(employee,type)
    res.sendStatus(200)
}

export async function activateCard(req:Request,res:Response){
    const {card}=res.locals
    const {password,securityCode}=req.body
    activateCardWithPassword(card,password,securityCode)
    res.sendStatus(200)
}