import dotenv from 'dotenv';
import User from '../models/user';
import formidable from 'formidable';
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

dotenv.config();

export const signup = (req, res) => {
    // từ ra đối tượng từ dữ liệu người dùng đẩy lên đã được mã hóa mật khẩu
    const user = new User(req.body);
    // lưu dữ liệu vào trong db
    user.save((error, user) => {
        if(error) {
            return res.status(400).json({
                message: "Đăng kí tài khoản thất bại"
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;

        // tạo ra token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
       
        // lưu trữ giá trị token lên trên cookie
        res.cookie('t', token, { expire: new Date() + 9999 });
        
        const { _id, name, email, role } = user;

        res.json({
            token,
            user: { _id, name, email, role }
        })
        // res.redirect('http://localhost:8000/#/sign-in');
    })
     
}

// export const signup = (req, res) => {
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {
//         if(err) {
//             return res.status(400).json({
//                 error: 'Đăng kí tài khoản không thành công !'
//             })
//         }
//         console.log(fields);
//     })
// }

// đăng nhập
export const sign_in = (req, res) => {
    // Giá trị người nhập vào
    const { email, password } = req.body;
   
    // tìm thông tin trùng khớp trong db
    User.findOne({ email }, (error, user) => {
        if(error || !user) {
            return res.status(400).json({
                error: 'Tài khoản không tồn tại !'
            })
        }
        // trùng tài khoản, kiểm tra mật khẩu
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Mật Khẩu Không Đúng'
            })
        }
        
        // Tự động tạo ra một mã cùng với user và mã secret
        // tạo mã thông báo đã ký với id người dùng và bí mật
        // tạo ra mã token gồm các thông tin như (id user, mã xác nhận chính chủ)
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
       
        // lưu trữ giá trị token lên trên cookie
        res.cookie('t', token, { expire: new Date() + 9999 });
        
        const { _id, name, email, role } = user;
        
        // trả về phản hồi với người dùng và mã thông báo cho ứng dụng khách giao diện người dùng
        return res.json({
            token,
            user: { _id, name, email, role }
        });

        // res.redirect('http://localhost:8000/#/');
    })
}

//đăng xuất
export const sign_out = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Signout Success'
    })
}

// kiểm tra chữ kí
export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
   
});

export const isAuth = (req, res, next) => {
    // req.profile => thông tin của admin
    // req.auth => mã token
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    console.log(req.auth);
    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}

export const isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).json({
            error: "Admin resource! Access Denined"
        })
    }
    next();
}