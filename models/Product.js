import mongoose from "mongoose";
import { Schema } from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0.01
    },

    category: {
        type: String,
        required: true,

    },

    instock: {
        type: Boolean,
        default: true,
    },

    tags: {
        type: [String]
    },

    createedAt: {
        type: Date,
        default: Date.now
    },
});
 
// schema into product model and export it
const Product = mongoose.model("Product", productSchema);

export default Product;