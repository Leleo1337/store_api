// ADD ITEMS FROM JSON TO DB

import { configDotenv } from "dotenv";
import connectDB from "../db/connect.js";
import Product from "../models/product.js";
import jsonProducts from "../../products.json" with { type: "json" };

configDotenv()

const start = async () => {
    try {
        await connectDB(process.env.DATABASE_ACCESS)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('Created products!!!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()