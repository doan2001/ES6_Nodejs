const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 100
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    hashed_password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true,
    },
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }

}, { timestamps: true })

// tạo ra 1 filed ảo
userSchema.virtual('password')
    .set(function (password) {
        this.salt = uuidv4() // mã unique
        // mã hóa mật khẩu
        this.hashed_password = this.encrytPassword(password)
    })


// signin
userSchema.methods = {
    // kiểm tra mật khẩu có trùng với giá trị user nhập vào
    authenticate: function (plainText) {
        return this.encrytPassword(plainText)  === this.hashed_password;
    },

    encrytPassword: function (password) {
        if(!password) return '';

        try{
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        }catch(error) {
            return '';
        }
    }
}

module.exports = mongoose.model("User", userSchema);