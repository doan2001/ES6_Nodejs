import express from 'express';
const router = express.Router();

import { listOrder, listOrderDetail, add, addDetail, idOrderDetail, updateOrderDetail} 
from './../controllers/order.controller.js';

import { userById } from './../controllers/user.controller';
import { requireSignin, isAuth, isAdmin } from './../controllers/auth.controller';

// list order
router.get('/orders', listOrder);

// list order detail
router.get('/orders_detail', listOrderDetail);

// thêm order 
router.post('/order/add', add);

// thêm order detail
router.post('/order_detail/add', addDetail);

// id order detail
router.param('idOrderDetail', idOrderDetail);

// id user
router.param('userId', userById);

// sữa order detail
router.put('/orders_detail/edit/:idOrderDetail/:userId', requireSignin, isAuth, isAdmin, updateOrderDetail);


module.exports = router;