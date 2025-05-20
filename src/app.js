import express from 'express'
import dotenv from 'dotenv'
import notFound from './middlewares/not-found.js'
import errorHandlerMiddleware from './middlewares/error-handler.js'

dotenv.config()
const app = express()
const PORT = 3000

app.use(express.json())

//routes 
app.get('/', (req,res) => {
    res.send('<h1>Store API</h1> <a href="/api/v1/products">products route</a>')
} )

//middleware
app.use(notFound)
app.use(errorHandlerMiddleware)

async function start(){
    try{
        // connectDB
        app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
    } catch(error){
        console.log(error)
    }
}

start()