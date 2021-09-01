import express from 'express';
import { listProduct, formAdd, create, productById, read, update, remove, photo, search }  from './../controllers/product.controller';
import { requireSignin, isAuth, isAdmin } from './../controllers/auth.controller';
import { userById } from './../controllers/user.controller'

const router = express.Router();


// list products
router.get('/products', listProduct)

// thêm sản phẩm
// router.get('/products/add', formAdd);
router.post('/products/add/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/products/photo/:productId', photo);

// chi tiết sản phẩm
router.get('/product/:productId', read);

// sửa sản phẩm
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);

// xóa sản phẩm
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);

// lấy id sản phẩm
router.param('productId', productById);

router.param('userId', userById);

// tìm kiếm sản phẩm
router.get('/search', search);
module.exports = router;