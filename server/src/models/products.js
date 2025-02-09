import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "A product must have name"]
    },
    images:{
        type: [String],
        required: [true, "A product alteast have one image"]
    },
    category: {
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: [true, "A product must have brand name"] 
    },
    reviews:{
        type: Array,
        required: [true, "A product must have reviews"],
        default: []
    },
    rating: {
        type: Number,
        required: [true, "A product must have rating"],
        default: 0
    },
    numberofReviews: {
        type: Number,
        requried: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    productIsNew: {
        type: Boolean,
        required: true,
        default: false
    },
    stripeId: {
        type: String,
    }
},
{
    timestamps: true
});
const Product = mongoose.model("products", productSchema);
export default Product;