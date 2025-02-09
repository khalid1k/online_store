import express from "express";
const router = express.Router();
import { getProducts, addProduct } from "../controller/productController.js";
router.get("/get-products", getProducts);
router.post("/add-product", addProduct);

export default router;