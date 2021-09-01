import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    categoryId: {
        type: ObjectId,
        ref: "category",
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 200
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxLength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    quantity: {
        type: Number,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    solid: {
        type: Number,
        default: 0
    },
    shopping: {
        required: false,
        type: Boolean
    },
    sale: {
        type: Number,
        default: 0
    },
    type_prd: {
        type: Number,
        default: 0
    }
    
}, {timestamps: true} )

module.exports = mongoose.model('Product', productSchema);