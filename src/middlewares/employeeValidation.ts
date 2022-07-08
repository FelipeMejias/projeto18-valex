import { NextFunction, Request, Response } from "express";
import { findByTypeAndEmployeeId } from "../repositories/cardRepository.js";
import { findById } from "../repositories/employeeRepository.js";
import { TransactionTypes } from "../repositories/cardRepository.js";

export async function employeeValidation(req:Request,res:Response,next:NextFunction){
    const {company}=res.locals
    const {employeeId,type}:{employeeId:number,type:TransactionTypes}=req.body

    const employee= await findById(employeeId)
    if(!employee || employee.companyId !== company.id)throw {type:'unauthorized'}
    res.locals.employee=employee

    const cardOfThisType= await findByTypeAndEmployeeId(type,employeeId)
    if(cardOfThisType)throw {type:'unauthorized'}

    next()
}