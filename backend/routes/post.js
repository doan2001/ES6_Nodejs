import express from 'express';
const router = express.Router();

import { list, add, idPost, detailPost } from './../controllers/post.controller';
import { userById } from './../controllers/user.controller';
import { requireSignin, isAuth, isAdmin } from './../controllers/auth.controller';

// lấy id
router.param('idPost', idPost);

// id user
router.param('userId', userById);

// danh sách bài viết
router.get('/posts', list);

router.post('/post/add/:userId', requireSignin, isAuth, isAdmin, add);

// chi tiết bài viết
router.get('/post/:idPost', detailPost);
module.exports = router;