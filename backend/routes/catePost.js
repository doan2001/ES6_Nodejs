import express from 'express';
const router = express.Router();

import { list, add, read, edit, catePostId, remove } from './../controllers/catePost.controller';

import { requireSignin, isAuth, isAdmin } from './../controllers/auth.controller';
import { userById } from './../controllers/user.controller';

router.get('/cate-post', list);

router.get('/cate-post/:catePostId', read);


router.post('/cate-post/add/:userId', requireSignin, isAuth, isAdmin, add);

router.put('/cate-post/:catePostId/:userId', requireSignin, isAuth, isAdmin, edit);

router.delete('/cate-post/:catePostId/:userId', requireSignin, isAuth, isAdmin, remove);

router.param('catePostId', catePostId);

router.param('userId', userById);

module.exports = router;