import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		maxLength: 100
	}
}, {timestamps: true});

module.exports = mongoose.model('category', categorySchema);