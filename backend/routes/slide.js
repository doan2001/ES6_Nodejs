import express from 'express';
import { list, create, slideById, photo, edit, remove, read } from './../controllers/slide.controller';

import { requireSignin, isAuth, isAdmin } from './../controllers/auth.controller';
import { userById } from './../controllers/user.controller';

const router = express.Router();

// list slider
router.get('/slides', list);

// thêm slide
router.post('/slide/add/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/slide/photo/:slideId', photo);

router.get('/slide/:slideId', read);

// sửa slide
router.put('/slide/edit/:slideId/:userId', requireSignin, isAuth, isAdmin, edit);

// xóa slide
router.delete('/slide/:slideId/:userId', requireSignin, isAuth, isAdmin, remove)

// lấy id 
router.param('slideId', slideById);

router.param('userId', userById);





module.exports = router;