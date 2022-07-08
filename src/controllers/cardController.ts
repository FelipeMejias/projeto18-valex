import { Request, Response } from "express";
import { createCard } from "../services/newCardService.js";

export async function postCard(req:Request,res:Response){
    const {type}=req.body
    const {employee}=res.locals
    createCard(employee,type)
    res.sendStatus(200)
}