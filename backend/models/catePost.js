import mongoose from 'mongoose';

const catePostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('catePost', catePostSchema);