import { QueryResultRow } from "pg";
import { CardInsertData, insert, TransactionTypes, update } from "../repositories/cardRepository.js";
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs'
import bcrypt from 'bcrypt'
import { findByCardId as findPayments}  from "../repositories/paymentRepository.js";
import { findByCardId as findRecharges } from "../repositories/rechargeRepository.js";
export async function createCard(employee:QueryResultRow,type:TransactionTypes) {
    
    const card: CardInsertData={
        employeeId:employee.id,
        number:faker.random.numeric(16),
        cardholderName:defineCardholderName(employee.fullName),
        securityCode:faker.random.numeric(3),
        expirationDate:defineExpirationDate(),
        password:null,
        isVirtual:true,
        originalCardId:null,
        isBlocked:false,
        type
    }
    await insert(card)
} 

export async function getCardDetailsById(cardId:number) {
    const transactionList= await findPayments(cardId)
    const rechargeList=await findRecharges(cardId)
    let balance = 0
    for(let transaction of transactionList){
        balance-=transaction.amount
    }
    for(let recharge of rechargeList){
        balance+=recharge.amount
    }
    return {
        balance,
        transactions:transactionList,
        recharges:rechargeList
    }
}



export async function activateCardWithPassword(card:QueryResultRow,password:string,securityCode:string){

    if(securityCode!==card.securityCode)throw {type:'unauthorized' ,message:'security code wrong'}
    
    if(card.password)throw {type:'already in use' ,message:'card already active'}
    const hashedPassword = bcrypt.hashSync(password, 10)
    const cardUpdateData={password:hashedPassword}
    await update(card.id,cardUpdateData)
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


function defineCardholderName(fullName:string){
    const list = fullName.toUpperCase().split(' ')
    const finalList=[list[0]]
    for(let k=1;k<list.length-1;k++){
        if(list[k].length>=3)finalList.push(list[k])
    }
    finalList.push(list[list.length-1])
    return finalList.join(' ')
}
function defineExpirationDate(){
    const today= dayjs().format('MM/YY')
    const expirationYear=parseInt(today[3]+today[4])+5
    return today[0]+today[1]+today[2]+expirationYear
}
