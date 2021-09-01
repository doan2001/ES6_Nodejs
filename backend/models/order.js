import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    name: {
    	type: String,
    	trim: true,
    	required: true,
    },
    phone: {
    	type: String,
    	trim: true,
    	required: true
    },
    capital: {
    	type: String,
    	trim: true,
    	required: true,
    },
    district: {
    	type: String,
    	trim: true,
    	required: true,
    },
    commune: {
    	type: String,
    	trim: true,
    	required: true,
    },
    address_detail: {
    	type: String,
    	trim: true,
    }
    // ,
    // save_info: {
    // 	type: Array
    // }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);