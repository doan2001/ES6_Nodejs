import { $, currentURL } from './../utils';
import orderApi from './../api/orderApi';
import productApi from './../api/productApi';
import storage from './../storages/storage';

const PurchasePage = {
    async render () {
        window.scrollTo(0,0);
        // const { data : dataUser } = await userApi.getAll();

        // // show list order
        const { data : ordersDetail } = await orderApi.getAllOrderDetail();
        
        const { data : orders } = await orderApi.getAllOrder();

        const { data : {data: products} } = await productApi.getAll();

        // let avatarUser = './images/avatar.jpg';
        // let nameUser = '';
        const user = storage.getId();

        let listOrder = [];
        if(user) {
            // const idUser = user.user._id;
            // ordersDetail.forEach(detail => {
            //     // lấy ra các trùng với id user và trùng với idorder
            //     const ordersUser = orders.find(order => {
            //         return order._id == detail.orderId && order.userId == idUser;
            //     });
                
            //     if(ordersUser) {
            //         // lấy ra các sản phẩm đã order
            //         let idOrderUser = ordersUser._id;
            //         const prdInOrder = products.filter(product => {
            //             return product._id == detail.prdId && detail.orderId == idOrderUser;
            //         })

            //         // lấy các dữ liệu cần thiết
            //         const result = prdInOrder.map(item => {                     
            //             return {
            //                 id: detail.orderId,
            //                 timeBuy: ordersUser.createdAt,
            //                 product: item.name,
            //                 totalPrice: detail.unitPrice * detail.quantity,
            //                 status: detail.status
            //             }
            //         })
                    
            //         listOrder.push(...result);
            //     }
            // })

            // get info user
            // const userLogin = dataUser.find(client => {
            //     return client.id == user.id;
            // })

            // avatarUser = userLogin.file,
            // nameUser = userLogin.name;
            let getOrder = [];
            orders.forEach(order => {
                // lẩy ra id order detail trùng với id order
                const listOderDetail = ordersDetail.filter(detail => {
                    return detail.orderId == order._id && order.userId == user.user._id;
                })

                if(listOderDetail.length >= 1){
                    // tình tổng tiền của các order detail thuộc 1 order
                    let totalPriceOrder = 0;
                    listOderDetail.forEach(orderDetail =>{
                        totalPriceOrder += orderDetail.unitPrice * orderDetail.quantity;
                    })

                    // Lẩy ra trạng thái order detail
                    const statusOrderDetail = listOderDetail.map(orderDetail =>{
                        return orderDetail.status;
                    })

                    // lây ra sản phẩm
                    let listPrd = [];
                    ordersDetail.forEach(detail => {
                        const resultPrd = products.filter(prd => {
                            return prd._id == detail.prdId && detail.orderId == order._id;
                        })
                        listPrd.push(...resultPrd);
                    })
                
                    const handleOrder = listPrd.map((prd, index) => {
                        if(index < 1){
                            return {
                                id: order._id,
                                timeBuy: order.createdAt,
                                quantityPrd: listPrd,
                                totalPrice: totalPriceOrder,
                                status: statusOrderDetail[0]
                            }
                        }
                    })
                    
                    getOrder.push(...handleOrder);
                }
                
            })
            listOrder = getOrder;
        }
       
        return /*html*/ `
            <div class="container">
                <div class="row">
                    <div class="col-3">
                        <div class="sidebar">
                            <div class="user-order">
                                <img src="" alt="" class="user-order__image">
                                <div class="model-title">
                                    <span class="model-title__des">Tài khoản của</span>
                                    <span class="model-title__name"><span>
                                </div>
                            </div>
                            <ul class="list-sidebar">
                                <li class="item-sidebar">
                                    <a href="" class="path-sidebar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                        </svg>
                                        <span class="title-path">Thông tin tài khoản</span>
                                    </a>
                                </li>
                                <li class="item-sidebar">
                                    <a href="" class="path-sidebar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                        </svg>
                                        <span class="title-path">Quản lý đơn hàng</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-9">
                        <div class="status-order">
                            <nav class="status-navigation">
                                <ul class="list-status">
                                    <li class="item-status active">
                                        Tất cả
                                    </li>
                                    <li class="item-status">
                                        Chờ xác nhận
                                    </li>
                                    <li class="item-status">
                                        Chờ lấy hàng
                                    </li>
                                    <li class="item-status">
                                        Đã giao hàng
                                    </li>
                                    <li class="item-status">
                                       Đã hủy
                                    </li>
                                    <div class="line-status"></div>
                                </ul>
                            </nav>

                            <div class="form-search-order">
                                <input type="text" placeholder="Tìm kiếm theo Tên Shop, ID đơn hàng hoặc Tên Sản phẩm" class="order-search">
                            </div>

                            <div class="status-main">
                                <div class="show-all panes active">
                                    <h2>Tất cả</h2>
                                </div>

                                <div class="wait-confirm panes">
                                    <table class="table-order">
                                        <thead>
                                            <tr>
                                                <th>Mã đơn hàng</th>
                                                <th>Ngày mua</th>
                                                <th>Sản phẩm</th>
                                                <th>Tổng tiền</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${
                                                listOrder.map((order,index) => {
                                                    if(order != undefined) {
                                                        let namePrd = `${order.quantityPrd[0].name}, ... và ${order.quantityPrd.length - 1} sản phảm khác.`;
                                        
                                                        let statusOrder;
                                                        switch(order.status){
                                                            case 0: 
                                                                statusOrder = 'Đã hủy';
                                                            break;
                                                            case 1: 
                                                                statusOrder = 'Chờ xác nhận';
                                                            break;
                                                            case 2: 
                                                                statusOrder = 'Chờ lấy hàng';
                                                            break;
                                                            case 3: 
                                                                statusOrder = 'Đã giao';
                                                            break;
                                                        }
                                                        return /*html*/ `
                                                            <tr>
                                                                <td class="tb-id">
                                                                    <a href="">${order.id}</a>
                                                                </td>
                                                                <td class="tb-time">${order.timeBuy}</td>
                                                                <td class="tb-name">${namePrd}</td>
                                                                <td>${order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                                                                <td class="tb-status">
                                                                    ${statusOrder}
                                                                </td>
                                                            </tr>
                                                        `;
                                                    }
                                                }).join('')
                                            }                                            
                                        </tbody>
                                    </table>
                                </div>

                                <div class="wait-product panes">
                                    <div class="prd-order">
                                        <img src="./images/fire.png" alt="" class="prd-order__img">
                                        <div class="prd-order-box">
                                            <span class="prd-order-box__name">asdfasdf</span>
                                            <span class="prd-order-box__quantity">x 1</span>
                                        </div>
                                        <div class="prd-order__price">
                                            124892379
                                        </div>
                                    </div>

                                    <div class="info-order">
                                        <div class="total-price-order">
                                            <span class="title-total-price">
                                                Tổng số tiền: 
                                            </span>
                                            <span class="value-total-price">
                                                1000000 
                                            </span>
                                        </div>
                                        <div class="btn-order">
                                            <button class="btn btn-contact">Liên hệ người bán</button>
                                            <button class="btn btn-refuse">Hủy đơn hàng</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="panes">
                                    Đang giao
                                </div>
                                
                                <div class="panes">
                                    Đã hủy
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 

    afterRender() {
        // tabs
        const itemsStatus = $('.item-status');
        const panes = $('.panes');

        const tabActive = $('.item-status.active');
        const line = $('.line-status');
        line.style.left = tabActive.offsetLeft + 'px';
        line.style.width = tabActive.offsetWidth + 'px';

        itemsStatus.forEach((item,index) => {
            const pane = panes[index];
            item.onclick = function () {
                $('.item-status.active').classList.remove('active');
                $('.panes.active').classList.remove('active');

                line.style.left = this.offsetLeft + 'px';
                line.style.width = this.offsetWidth + 'px';

                this.classList.add('active');
                pane.classList.add('active');
            }
        })

    }
}

export default PurchasePage;