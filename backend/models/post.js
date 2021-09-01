import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
    catePostId: {
        type: ObjectId,
        ref: 'category',
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'user', 
        required: true
    },
    header_post:{
        type: String,
        maxLength: 100
    },
    des_post: {
        type: String,
        maxLength: 500
    },
    preamble_post: {
        type: String,
        maxLength: 1000
    },
    content_post: {
        type: String,
        maxLength: 2000
    },
    footer_post: {
        type: String,
        maxLength: 500
    }
    // ,
    // photo: {
    //     data: Buffer,
    //     contentType: String
    // }

}, { timestamps: true });

module.exports = mongoose.model('post', postSchema);
