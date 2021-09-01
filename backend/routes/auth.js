import express from 'express';

import { signup, sign_in, sign_out } from '../controllers/auth.controller';

import { userSignupValidator } from './../validator/validator';

const router = express.Router();

// đăng kí tài khoản
router.post('/signup', userSignupValidator, signup);

// đăng nhập
router.post('/sign_in', sign_in);

// đăng xuất
router.get('/sign_out', sign_out);



module.exports = router;