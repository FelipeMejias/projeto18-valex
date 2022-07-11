import { QueryResultRow } from "pg";
import { findById } from "../repositories/businessRepository.js";
import { insert, PaymentInsertData } from "../repositories/paymentRepository.js";
import { getCardDetailsById } from "./cardService.js";

export async function createPayment(card:QueryResultRow,businessId:number,amount:number) {
    
    const business=await findById(businessId)
    if(!business)throw {type:'not found' ,message:'business does not exist'}
    if(card.type!==business.type)throw {type:'unavailable' ,message:'card type and business type does not match'}

    if(card.isBlocked)throw {type:'unvailable' ,message:'card is blocked'}
    if(amount<=0 || amount ==null)throw {type:'bad request' ,message:'amount must be bigger than 0'}

    const {balance}= await getCardDetailsById(card.id)
    if(amount>balance) throw {type:'unavailable' ,message:'insuficient balance'}

    const payment: PaymentInsertData={
    cardId: card.id,
    businessId,
    amount
    }
    await insert(payment)
} 

