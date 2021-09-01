import Order from './../models/order';
import OrderDetail from './../models/order_detail';

// hiển thị danh sách oder
export const listOrder = (req, res) => {
    Order.find((err, data) => {
        if(err) {
            return res.status(400).json({
                error: 'Không tìm thấy list order'
            })
        }
        res.json(data);
    })
}

// hiển thị danh sách order detail
export const listOrderDetail = (req, res) => {
    OrderDetail.find((err, data) => {
        if(err) {
            return res.status(400).json({
                error: 'Không tìm thấy list order detail'
            })
        }
        res.json(data);
    })
}

// thêm order và lưu vào db
export const add = (req, res) => {
    const order = new Order(req.body);

    order.save((error, data) => {
        if(error) {
            return res.status(400).json({
                error: "Order không thành công !"
            })
        }
        res.json(data);
    })
}

// thêm order detail và lưu vào db
export const addDetail = (req, res) => {
    const orderDetail = new OrderDetail(req.body);
    
    orderDetail.save((error, data) => {
        if(error) {
            return res.status(400).json({
                error: "Order không thành công !"
            })
        }
        res.json(data);
    })
}

// id order detail
export const idOrderDetail = (req, res, next, id) => {
    req.orderDetail = req.body; 
    next();
    // console.log(req.body);
    // console.log(id);
    // OrderDetail.findById(id).exec((err, data) => {
    //     if(err) {
    //         return res.status(400).json({
    //             error: 'Không tìm thấy order detail'
    //         })
    //     }
    //     console.log(data);
    //     req.orderDetail = data;
    //     next();
    // })
}

// update order detail khi admin đã xác thực
export const updateOrderDetail = async (req, res) => {
    const newOrderDetail = req.body;
    newOrderDetail.status = 2;
    
    let options = { multi: true, upsert: true };
    // console.log(array);
    OrderDetail.updateMany(newOrderDetail, options, (err, data) => {
        if(err) {
            return res.status(400).json({
                error: 'Xác nhận order thất bại !'
            })
        }
        res.json(data);
    })
    // const result = await OrderDetail.updateMany(newOrderDetail, options);
    // console.log(result);
}

