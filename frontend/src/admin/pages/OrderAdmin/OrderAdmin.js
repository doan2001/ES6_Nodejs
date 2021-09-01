import orderApi from './../../../api/orderApi';
import { $, resetRender } from './../../../utils';

const OrderAdmin = {
    async render (){
        const { data : ordersDetail } = await orderApi.getAllOrderDetail();
        const { data : orders } = await orderApi.getAllOrder();

        let orderUser = [];
        const result = orders.forEach(order => {
            // get order detail có idOrder giống nhau
            const details = ordersDetail.filter(detail => {
                return detail.orderId == order._id;
            })

            // tính tổng số lượng sp và tổng tiền đơn hàng theo idOrder giống nhau
            let totalPrd = 0;
            let totalPrice = 0;
            details.forEach(qt => {
                totalPrd += parseInt(qt.quantity);
                totalPrice += parseInt(qt.unitPrice) * parseInt(qt.quantity);
            })
            
            const listOrder = {
                id: details[0].orderId,
                name: order.name,
                quantity: totalPrd,
                timeOrder: order.createdAt,
                totalPriceOrder: totalPrice,
                status: details[0].status,
            }
            orderUser.push(listOrder);
        })


        return /*html*/ `
        <div class="container-fluid mt-4 list-cate">
            <div class="row row-table">
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between">
                        <h2>Danh sách order</h2>
                        
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Người đặt</th>
                                    <th>Số lượng</th>
                                    <th>Thời gian</th>
                                    <th>Tổng tiền đơn hàng chưa trừ Sale</th>
                                    <th>Xác nhận</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    orderUser.map((order, index) => {
                                        let statusOrder = '';
                                        switch(order.status){
                                            case 1:
                                                statusOrder = 'Chờ xác nhận';
                                            break;
                                            case 2:
                                                statusOrder = 'Chờ xác nhận';
                                            break;
                                            case 3:
                                                statusOrder = 'Đã xác nhận';
                                            break;
                                        }
                                        return /*html*/ `
                                            <tr>
                                                <td>${index + 1}</td>
                                                <td>${order.name}</td>
                                                <td>${order.quantity}</td>
                                                <td>${order.timeOrder}</td>
                                                <td>${order.totalPriceOrder.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                                                <td>
                                                    <span class="notice" data-order="${order.id}">${statusOrder}</span>
                                                </td>
                                                <td>
                                                    <a class="btn btn-primary fs-4" href="/#/admin_order_detail/${order.id}">Chi tiết</a>
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')
                                }
                            
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
        `;
    },

    async afterRender() {
        const { data : ordersDetail } = await orderApi.getAllOrderDetail();

        const btnStatus = $('.notice');
        if(Array.isArray(btnStatus)){
            btnStatus.forEach(btn => {
                btn.addEventListener("click", () => {
                    btn.classList.add('checked');
                    btn.innerText = 'Chờ lấy hàng';
                    let idOrderDetail = btn.dataset.order;
                    
                    // lấy ra order details
                    const checkedOrderDetail = ordersDetail.filter(orderDetail => {
                        return orderDetail.orderId == idOrderDetail;
                    })
                    
                    // sửa trạng thái order details
                    checkedOrderDetail.forEach( async (order) => {
                        order.status = 2;
                        const updateOrderDetailFinish = await orderApi.updateOrderDetail(order, order.orderId);
                        if(updateOrderDetailFinish){
                            console.log(updateOrderDetailFinish);
                        }
                    })

                })
            })

        } else {
            btnStatus.onclick = async () => {
                btnStatus.classList.add('checked');
                btnStatus.innerText = 'Chờ lấy hàng';
                let idOrderDetail = btnStatus.dataset.order;
                
                // lấy ra order details
                const checkedOrderDetail = ordersDetail.filter(orderDetail => {
                    return orderDetail.orderId == idOrderDetail;
                })

                // sửa trạng thái order details
                checkedOrderDetail.forEach( async (order) => {
                    const updateOrderDetailFinish = await orderApi.updateOrderDetail(order, order.orderId);
                    if(updateOrderDetailFinish){
                        console.log(updateOrderDetailFinish);
                    }
                })
                
            }
        }
        
    }
}


export default OrderAdmin;