import { QueryResultRow } from "pg";
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt'
import { CardInsertData, insert, TransactionTypes, update } from "../repositories/cardRepository.js";
import { findByCardId as findPayments}  from "../repositories/paymentRepository.js";
import { findByCardId as findRecharges } from "../repositories/rechargeRepository.js";
import { defineCardholderName, defineExpirationDate } from "../utils/cardUtils.js";

export async function createCard(employee:QueryResultRow,type:TransactionTypes) {
    const securityCode=faker.random.numeric(3)
    const hashedSecurityCode = bcrypt.hashSync(securityCode, 10)
    const card: CardInsertData={
        employeeId:employee.id,
        number:faker.random.numeric(16),
        cardholderName:defineCardholderName(employee.fullName),
        securityCode:hashedSecurityCode,
        expirationDate:defineExpirationDate(),
        password:null,
        isVirtual:true,
        originalCardId:null,
        isBlocked:false,
        type
    }
    await insert(card)
    return {securityCode}
} 

export async function activateCardWithPassword(card:QueryResultRow,password:string,securityCode:string){
    if(!securityCode)throw{type:'bad request' , message:'missing security code'}
    if( !bcrypt.compareSync(securityCode, card.securityCode))throw{type:'unauthorized' , message:'security code wrong'}
    if(card.password)throw {type:'already in use' ,message:'card already active'}

    const hashedPassword = bcrypt.hashSync(password, 10)
    const cardUpdateData={password:hashedPassword}
    await update(card.id,cardUpdateData)
}

export async function getCardDetailsById(cardId:number) {
    const transactionList= await findPayments(cardId)
    const rechargeList=await findRecharges(cardId)
    let balance = 0
    for(let transaction of transactionList){balance-=transaction.amount}
    for(let recharge of rechargeList){balance+=recharge.amount}
    return {
        balance,
        transactions:transactionList,
        recharges:rechargeList
    }
}

export async function changeToBlockCard(card:QueryResultRow){
    if(card.isBlocked)throw {type:'already in use' ,message:'card already blocked'}
    const cardUpdateData={isBlocked:true}
    await update(card.id,cardUpdateData)
}

export async function changeToUnblockCard(card:QueryResultRow){
    if(!card.isBlocked)throw {type:'already in use' ,message:'card already unblocked'}
    const cardUpdateData={isBlocked:false}
    await update(card.id,cardUpdateData)
}




