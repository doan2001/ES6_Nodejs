import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const feedbackSchema = new mongoose.Schema({
	userId: {
		type: ObjectId,
		ref: "User",
		required: true
	},
	name: {
		type: String,
		trim: true,
		require: true
	},
	phone: {
		type: Number,
		trim: true,
		require: true
	},
	email: {
		type: String,
		trim: true,
		required: true,
	},
	content: {
		type: String,
		trim: true,
		required: true,
		maxLength: 2000
	}
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);