import { NextFunction, Request, Response } from "express";

export async function handleError(error:any,req:Request,res:Response,next:NextFunction) {
    
    console.log(error)

    if(error.type==='bad request') return res.status(422).send(error.message)
    if(error.type==='unauthorized') return res.status(401).send(error.message)
    if(error.type==='not found') return res.status(404).send(error.message)
    if(error.type==='already in use') return res.status(405).send(error.message)
    if(error.type==='unavailable') return res.status(405).send(error.message)

    res.sendStatus(500)
}