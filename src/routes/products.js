import express from 'express'
import { getAllProducts } from '../controllers/products.js'

const productsRouter = express.Router()

productsRouter.get('/', getAllProducts)
productsRouter.get('/static', getAllProducts)


export default productsRouter