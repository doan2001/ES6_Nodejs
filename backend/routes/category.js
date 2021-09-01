import express from 'express';

import { list, create, categoryId, read, update, remove } from './../controllers/category.controller';

import { requireSignin, isAdmin, isAuth } from './../controllers/auth.controller';

import { userById } from './../controllers/user.controller';

const router = express.Router();

// list category
router.get('/categories', list);

// add category
router.post('/categories/add/:userId', requireSignin, isAuth, isAdmin, create);

// detail category
router.get('/category/:categoryId', read);

// update category
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin ,update);

// lấy id sản phẩm
router.param('categoryId', categoryId);

// xóa danh mục
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove)

router.param('userId', userById);






module.exports = router;