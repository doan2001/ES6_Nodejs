import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const orderDetailSchema = new mongoose.Schema({
	orderId: {
		type: ObjectId,
		ref: "Order",
		required: true
	},
	prdId: {
		type: ObjectId,
		ref: "Product",
		required: true
	},
	unitPrice: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	status: {
		type: Number,
		default: 1
	}
}, { timestamps: true });

module.exports = mongoose.model('OrderDetail', orderDetailSchema);