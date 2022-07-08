import { NextFunction, Request, Response } from "express"
import { findById } from "../repositories/cardRepository.js"
import bcrypt from 'bcrypt'
import dayjs from 'dayjs'
export async function cardExists(req:Request,res:Response,next:NextFunction){
    const id:number=parseInt(req.params.id)
    const card= await findById(id)
    if(!card)throw {type:'not found'}
    res.locals.card=card
    next()
}

export async function cvc(req:Request,res:Response,next:NextFunction){
    
}

export async function confirmPassword(req:Request,res:Response,next:NextFunction){
    const password:string=req.body.password
    const {card}=res.locals
    if( !bcrypt.compareSync(password, card.password))throw{type:'unauthorized'}
    next()
}

export async function isUnexpired(req:Request,res:Response,next:NextFunction){
    const {card}= res.locals
    const today= dayjs().format('MM/YY')
    const expiration=card.expirationDate

    const todayYear=parseInt(today[3]+today[4])
    const todayMonth=parseInt(today[0]+today[1])
    const expirationYear=parseInt(expiration[3]+expiration[4])
    const expirationMonth=parseInt(expiration[0]+expiration[1])

    if(
        (todayYear>expirationYear)||
        (todayYear===expirationYear && todayMonth>=expirationMonth)
    )throw {type:'unauthorized'}
    next()
}





















export async function isUnBlocked(req:Request,res:Response,next:NextFunction){
    const {card}= res.locals
    if(card.isBlocked)throw {type:'already in use'}
    next()
}

export async function isBlocked(req:Request,res:Response,next:NextFunction){
    const {card}= res.locals
    if(!card.isBlocked)throw {type:'already in use'}
    next()
}