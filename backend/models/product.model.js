import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['PC Games', 'Xbox Games', 'PS Games', 'Gaming Components'],
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    stockQty: {
        type: Number,
        required: true
    },
    rating: {
        type: String,
        min: 0,
        max: 5
    },
    releaseDate: {
        type: String,
        required: true
    },
    aboutGame: {
        type: String,
        required: true
    }
},{timestamps: true})

export const Product = mongoose.model("Product", productSchema)