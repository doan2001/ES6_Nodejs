import express from 'express';
import { idCmt, list, add, remove } from './../controllers/comment.controller';
import { userById } from './../controllers/user.controller';

import { requireSignin, isAuth, isAdmin } from './../controllers/auth.controller';
const router = express.Router();

// id cmt
router.param('idCmt', idCmt);

// id user 
router.param('userId', userById);

// hiển thị
router.get('/comments', list);

// tạo bình luận
router.post('/comment/add', add);

//Xóa bình luận
router.delete('/comment/:idCmt/:userId', requireSignin, isAuth, isAdmin, remove);

module.exports = router;