import express from "express";
import notFound from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import productsRouter from "./routes/products.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send('<h1>Store API</h1> <a href="/api/v1/products">products route</a>'));
app.use("/api/v1/products", productsRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

export default app;