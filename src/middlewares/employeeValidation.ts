import { NextFunction, Request, Response } from "express";
import { findByTypeAndEmployeeId } from "../repositories/cardRepository.js";
import { findById } from "../repositories/employeeRepository.js";
import { TransactionTypes } from "../repositories/cardRepository.js";

export async function employeeValidation(req:Request,res:Response,next:NextFunction){
    const {company}=res.locals
    const {employeeId}=req.params
    const {type}:{type:TransactionTypes}=req.body

    const employee= await findById(parseInt(employeeId))
    if(!employee)throw {type:'not found' , message:'this employee does not exist'}

    if(employee.companyId !== company.id)throw {type:'unauthorized' ,message:'employee is not from this company'}
    res.locals.employee=employee

    const cardOfThisType= await findByTypeAndEmployeeId(type,parseInt(employeeId))
    if(cardOfThisType)throw {type:'unauthorized', message:'employee already has a card of this type'}

    next()
}