import express from "express";
import dotenv from "dotenv";
import notFound from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import connectDB from "./db/connect.js";
import productsRouter from "./routes/products.js";
dotenv.config();

const app = express();

app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send('<h1>Store API</h1> <a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", productsRouter);

// products route

app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT;

async function start() {
   try {
      await connectDB(process.env.DATABASE_ACCESS);
      app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
   } catch (error) {
      console.log(error);
   }
}

start();
