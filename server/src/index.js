import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/dbConfig.js";
import express from "express";
import cors from "cors";
import AppError from "./utils/appError.js";
import globalErrorHandler from "../src/controller/errorController.js";
import productsRoutes from "../src/routes/productRoutes.js";
connectDb();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
app.use("/api/v1/products", productsRoutes);

app.all('*', (req, res, next)=>{
    return next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler);
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})
