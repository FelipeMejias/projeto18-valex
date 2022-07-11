import { QueryResultRow } from "pg";
import { insert, RechargeInsertData } from "../repositories/rechargeRepository.js";

export async function createRecharge(card:QueryResultRow,amount:number) {
    
    if(!card.password)throw {type:'unvailable' , message:'card is not active'}
    if(amount<=0 || amount==null)throw {type:'bad request' ,message:'amount must be bigger than 0'}

    const recharge: RechargeInsertData={
        cardId:card.id,
        amount
    }
    await insert(recharge)
} 
