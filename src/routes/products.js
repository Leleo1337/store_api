import express from 'express'
import { getAllProducts, getAllProductsStatic } from '../controllers/products.js'

const productsRouter = express.Router()

productsRouter.get('/', getAllProducts)
productsRouter.get('/static', getAllProductsStatic)


export default productsRouter