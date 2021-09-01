import Cart from './../models/cart';

export const list = (req, res) => {
    Cart.find((err, data) => {
        if(err) {
            error: 'Không tìm thấy danh sách giỏ hàng'
        }
        res.json(data)
    })
}

export const idCart = (req, res, next, id) => {
    Cart.findById(id).exec((err, data) => {
        if(err || !data) {
            return res.status(400).json({
                error: 'Không tìm thấy cart'
            })
        }
        req.cart = data;
		next();
    })
}


export const addCart = (req, res) => {
    const product = new Cart(req.body);
    product.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: 'Thêm vào giỏ hàng không thành công'
            })
        }
        res.json(data);
    })
}

export const updateCart = (req, res) => {
    const cart = req.cart;
    cart.quantity = req.body.quantity;
    cart.save((err, data) => {
        if(err) {
            res.status(400).json({
                error: 'Sửa giỏ hàng không thành công'
            })
        }
        res.json(data);
    })
}

export const remove = (req, res) => {
    const removeCart = req.cart;
    removeCart.delete((err, data) => {
        if(err) {
            return res.status(400).json({
                error: 'Xóa giỏ hảng không thành công !'
            })
        }
        res.json(data);
    })
}

export const removeMultiple = async (req, res) => {
    const listRemoveCart = req.cart;

    listRemoveCart.delete((err, data) => {
        if(err) {
            return res.status(400).json({
                error: 'xoa cart khong thanh cong'
            })
        }
        res.json(data);
    })
   
}