import { QueryResultRow } from "pg";
import { findById } from "../repositories/businessRepository";
import { insert, PaymentInsertData } from "../repositories/paymentRepository";

export async function createPayment(card:QueryResultRow,businessId:number,amount:number) {
    
    const business=await findById(businessId)
    if(!business)throw {type:'not found'}
    if(card.type!==business.type)throw {type:'unavailable'}

    if(card.isBlocked)throw {type:'unvailable'}
    if(amount<=0)throw {type:'bad request'}

    const payment: PaymentInsertData={
    cardId: card.id,
    businessId,
    amount
    }
    await insert(payment)
} 

