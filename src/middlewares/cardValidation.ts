import { NextFunction, Request, Response } from "express"
import bcrypt from 'bcrypt'
import joi from 'joi'
import { findById } from "../repositories/cardRepository.js"
import { checkExpiriration } from "../utils/cardUtils.js"

export async function cardExists(req:Request,res:Response,next:NextFunction){
    const id:number=parseInt(req.params.cardId)
    const card= await findById(id)
    if(!card)throw {type:'not found' ,message:'this card does not exist'}
    res.locals.card=card
    next()
}

export async function newPasswordValidation(req:Request,res:Response,next:NextFunction){
    const {password}=req.body
    const schema=joi.string().pattern(/^[0-9]{4}$/).required()
    const validate=schema.validate(password)
    if (validate.error) throw {type:'bad request' ,message:'new password must have exactly 4 numbers'}
    next()
}

export async function confirmPassword(req:Request,res:Response,next:NextFunction){
    const password:string=req.body.password
    const {card}=res.locals
    if(!card.password)throw {type:'unavailable' ,message:'this card is not active'}
    if( !bcrypt.compareSync(password, card.password))throw{type:'unauthorized' , message:'password wrong'}
    next()
}

export async function isUnexpired(req:Request,res:Response,next:NextFunction){
    const {card}= res.locals
    const expiration=card.expirationDate
    const expired=checkExpiriration(expiration)
    if(expired)throw {type:'unauthorized' , message:'card expired'}
    next()
}
