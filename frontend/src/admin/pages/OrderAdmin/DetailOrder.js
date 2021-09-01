import orderApi from '../../../api/orderApi';
import productApi from '../../../api/productApi';

import { $, resetRender, currentURL } from './../../../utils';

const DetailOrder = {
    async render (){
        const { data : dataOrders } = await orderApi.getAllOrder();
        const { data : {data: dataProducts} } = await productApi.getAll();
        const { data : dataOrderDetail } = await orderApi.getAllOrderDetail();
        const idOrder = currentURL().id;
        
        // get value address user order
        const userOrder = dataOrders.find(order => {
            return order._id == idOrder;
        })
        
        let orders = [];
        let totalPay = 0;

        dataOrderDetail.forEach(orderDetail => {
            // lấy ra các sản phẩm theo idOrder
            const prdOrder = dataProducts.filter(product => {
                return orderDetail.prdId == product._id && orderDetail.orderId == idOrder;
            })
           
            // lấy ra các sp đã order
            const handleOrdered = prdOrder.map(order => {
                return {
                    idPrd: order._id,
                    name: order.name, 
                    image: order.photo,
                    price: order.price,
                    quantity: orderDetail.quantity,
                    sale: order.sale,
                }
            })
            orders.push(...handleOrdered);
        })

        return /*html*/ `
        <div class="container-fluid mt-4 list-cmt-detail">
            <div class="row row-table">
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between">
                        <h2>Chi tiết order: <mark>${''}</mark></h2>
                    </div>
                    <div class="mt-3 mb-4">
                        <div class="card">
                            <div class="card-header">
                                Thông tin người đặt
                            </div>
                            <div class="card-body">
                                <p class="card-text">Người đặt hàng: ${userOrder.name}</p>
                                <p class="card-text">Số điện thoại: ${userOrder.phone}</p>
                                <p class="card-text">Địa chỉ: ${userOrder.commune} - ${userOrder.district} - ${userOrder.capital}</p>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Giảm giá</th>
                                    <th>Tạm tính</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    orders.map((order, index) => {
                                        let totalPrice = 0;
                                        let priceSale = 0;
                                        if(order.sale == '' || order.sale == null || order.sale == 0) {
                                            priceSale = parseInt(order.price);
                                        } else {
                                            priceSale = ((100 - parseInt(order.sale)) / 100) * parseInt(order.price);
                                        }
                                        
                                        // total price
                                        totalPrice += (priceSale * order.quantity);
                                        // total pay
                                        totalPay += totalPrice;

                                        return /*html*/ `
                                            <tr>
                                                <td>${index + 1}</td>
                                                <td>
                                                    ${order.name}
                                                    <img src="http://localhost:4000/api/products/photo/${order.idPrd}" alt="" width="100px" height="100px" class="d-block mt-2">
                                                </td>
                                                <td>${order.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                                                <td>${order.quantity}</td>
                                                <td>${order.sale ? order.sale : ''} %</td>
                                                <td>${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                                            </tr>
                                        `;
                                    }).join('')
                                }
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Tổng cộng</td>
                                    <td>${Math.ceil(totalPay).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
        `;
    },

    afterRender() {
        
    }
}


export default DetailOrder;