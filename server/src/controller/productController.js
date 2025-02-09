import Product from "../models/products.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { uploadToCloudinary } from "../utils/cloundinary.js";
export const getProducts = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * limit; 
    const totalProducts = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);
    res.status(200).json({
      status: "success",
      results: products.length,
      totalPages: Math.ceil(totalProducts / limit), // Total pages
      currentPage: page,
      data: {
        products,
      },
    });
  });


  export const addProduct = catchAsync(async (req, res, next) => {
    const {
      name,
      category,
      brand,
      reviews,
      rating,
      numberofReviews,
      price,
      stock,
      productIsNew,
      stripeId,
    } = req.body;
   //extract the images from req.files
    const imageFiles = req.files?.images || [];
    if (!imageFiles || imageFiles.length === 0) {
        return next(new AppError("A product must have at least one image", 400));
      }
   let imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        return await uploadToCloudinary(file.buffer, fileName); 
      })
    );
    const newProduct = await Product.create({
      name,
      images: imageUrls,
      category,
      brand,
      reviews: reviews || [], 
      rating: rating || 0, 
      numberofReviews: numberofReviews || 0,
      price,
      stock,
      productIsNew: productIsNew || false,
      stripeId,
    });
    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: {
        product: newProduct,
      },
    });
  });