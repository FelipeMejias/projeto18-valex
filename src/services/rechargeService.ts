import { QueryResultRow } from "pg";
import { insert, RechargeInsertData } from "../repositories/rechargeRepository";

export async function createRecharge(card:QueryResultRow,amount:number) {
    
    if(!card.password)throw {type:'unvailable'}
    if(amount<=0)throw {type:'bad request'}

    const recharge: RechargeInsertData={
        cardId:card.id,
        amount
    }
    await insert(recharge)
} 
