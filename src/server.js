import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();

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