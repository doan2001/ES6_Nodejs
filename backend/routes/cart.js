import express from 'express';
import { list, idCart, addCart, updateCart, remove, removeMultiple } from './../controllers/cart.controller';

const router = express.Router();    

// get all cart
router.get('/cart', list);

// lấy id
router.param('idCart', idCart);

// add to cart
router.post('/add_cart', addCart);

// update cart
router.put('/add_cart/:idCart', updateCart);

// remove cart (xóa từng cái 1)
router.delete('/remove_cart/:idCart', remove);

// remove cart ( khi đã đặt hàng thành công )
router.delete('/remove_cart/multiple/:idCart', removeMultiple);

module.exports = router;