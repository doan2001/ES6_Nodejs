import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
	photo: {
		data: Buffer,
		contentType: String,
		
	},
	pathImage: {
		type: String,
		trim: true
	}
}, { timestamps: true });

module.exports = mongoose.model('Slide', slideSchema);
