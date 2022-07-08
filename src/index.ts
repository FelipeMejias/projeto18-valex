import express,{json} from 'express'
import "express-async-errors"
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routers/index.js'
dotenv.config()

const app=express()

app.use(json())
app.use(cors())
app.use(router)

const port:number=+process.env.PORT || 5001
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})