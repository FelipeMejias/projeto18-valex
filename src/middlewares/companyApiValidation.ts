import { NextFunction, Request, Response } from "express";
import {findByApiKey} from '../repositories/companyRepository.js'

export async function companyApiValidation(req:Request,res:Response,next:NextFunction){
    const apiKey =req.headers["x-api-key"]
    if(!apiKey || typeof apiKey !== 'string'){
        throw {type:'bad request' ,message:'api key must be a string'}
    }
    const company=await findByApiKey(apiKey)
    if(!company){
        throw {type:'not found', message: 'this api key does not exist'}
    }
    res.locals.company = company
    next()
}