import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    prdId: {
        type: ObjectId,
        ref: "Product",
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 200
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    sale: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number
    }
}, {timestamps: true} );

module.exports = mongoose.model('Cart', cartSchema);