import productApi from './../api/productApi';
import orderApi from './../api/orderApi';
import cartApi from './../api/cartApi';

import { $, resetRender } from './../utils.js';
import Validator from './../components/ValidationForm'; 

import { optionQuantityProduct } from './../components/effect';

import Header from './../components/Header';

import storage from './../storages/storage';

const CartPage = {
    async render () {
        window.scrollTo(0,0);
        const {data: listCart} = await cartApi.getAll();
        const {data: {data: products}} = await productApi.getAll();
        const user = storage.getId();

        if(user) {
            // lấy cart theo user
            const cartFollowUser = listCart.filter(cart => {
                return cart.userId == user.user._id;
            })
            // lấy ảnh sản phẩm tương ứng trong cart
            let getPrdInCart = [];
            cartFollowUser.forEach(cart => {
                const prdCart = products.map(prd => {
                    if(prd._id == cart.prdId){
                        prd.cartId = cart._id;
                        prd.quantity = cart.quantity;
                        return prd;
                    }
                })
                getPrdInCart.push(...prdCart);
            })
            
            // loại bỏ giá trị undefined trong prdInCart;
            const prdInCart = getPrdInCart.filter(prd => {
                return prd != undefined;
            })

            if(prdInCart.length >= 1) {
                let totalCart = 0;
                let totalPay = 0;
    
                prdInCart.forEach(product => {
                    totalCart += product.quantity;
                })
                return /*html*/ `
                    <div class="container" id="cart">			
                        <div class="page-cart">
                            <h3 class="page-cart__title">Giỏ hàng</h3>
                            <span class="page-cart__quantity">( ${'' + ' sản phẩm'} )</span>
                        </div>
                        <div class="row">
                            <div class="col-lg-9">
                                <div class="cart-title">
                                <div class="cart-title__product">Sản phẩm</div>
                                <div class="cart-title__unit">Đơn giá</div>
                                <div class="cart-title__quantity">Số lượng</div>
                                <div class="cart-title__total">Số tiền</div>
                            </div>
                                ${
                                    prdInCart.map(product => {
                                        let totalPrice = 0;
                                        let pricePrd;
                                        if(product.sale != '') {
                                            pricePrd = ((100 - product.sale) / 100 ) * product.price
                                        } else {
                                            pricePrd = product.price;
                                        }
                                        // tổng tiền sản phẩm
                                        totalPrice += (pricePrd * product.quantity);
    
                                        // total pay
                                        totalPay += totalPrice;
    
                                        return /*html*/ `
                                            <div class="list-cart">
                                                <img src="http://localhost:4000/api/products/photo/${product._id}" alt="" class="list-cart__img">
                                                <div class="cart-content">
                                                    <div class="cart-box">
                                                        <span class="cart-box__name">${product.name}</span>
                                                        <a href="javascript:void(0)" class="remove-cart" data-id="${product.cartId}">Xóa</a>
                                                    </div>
                                                    <div class="cart-control">
                                                        <span class="price-model">${pricePrd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                                                        <div >
                                                            <div class="control-quantity" data-id="${product._id}">
                                                                <button class="btn-quantity btn-minus disable">
                                                                    <i class="fas fa-minus"></i>
                                                                </button>
                                                                <input type="number" class="value-quantity" value='${product.quantity}'>
                                                                <button class="btn-quantity btn-plus">
                                                                    <i class="fas fa-plus"></i>
                                                                </button>	
                                                            </div>
                                                        </div>
                                                        <span class="price-model">${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                                                    </div>
                                                </div>
                                            </div>
                                        `;
                                    }).join('')
                                }
                               
                            </div>
                            <div class="col-lg-3">
                                <div class="finish-cart">
                                    <div class="total-price">
                                        <span class="total-price__title">Thành tiền:</span>
                                        <span class="total-price__value">${totalPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                                    </div>
                                    <div class="finish-box">
                                        <img src="./images/rau_trang.png" alt="" class="finish-box__img">
                                        <span class="eye"></span>
                                        <span class="eye eye-right"></span>
                                    </div>
                                    <button class="btn-finish">
                                        Tiền hành đặt hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="box-info">
                                <form action="" class="form-info">
                                    <h4 class="form-title">Thông tin địa chỉ</h4>
                                    <span class="form-des">Vui lòng điền thông tin người nhận hàng !</span>
                                    <span class="btn-close close">
                                    </span>
                                    <div class="form-group">
                                        <input type="text" placeholder="Họ & Tên" name="name" class="input-f data-name">
                                        <span class="err-message"></span>
                                    </div>
                                    <div class="form-group">
                                        <input type="number" placeholder="Số điện thoại" name="phone" class="input-f data-phone">
                                        <span class="err-message"></span>
                                    </div>
                                    <div class="form-group">
                                        <select id="" class="input-f data-capital" name="capital">
                                            <option value="">Tỉnh/Thành phố</option>
                                            <option value="Hà Nội">Hà Nội</option>
                                            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                            <option value="Hải Phòng">Hải Phòng</option>
                                        </select>
                                        <span class="err-message"></span>
                                    </div>
                                    <div class="form-group">
                                        <select name="district" id="" class="input-f data-district">
                                            <option value="">Quận/Huyện</option>
                                            <option value="Đan Phương">Đan Phương</option>
                                            <option value="Hoài Đức">Hoài Đức</option>
                                            <option value="Phú Thọ">Phú Thọ</option>
                                        </select>
                                        <span class="err-message"></span>
                                    </div>
                                    <div class="form-group">
                                        <select name="commune" id="" class="input-f data-commune">
                                            <option value="">Xã/Phường</option>
                                            <option value="Đồng Tháp">Đồng Tháp</option>
                                            <option value="Liên Hồng">Liên Hồng</option>
                                            <option value="Tân Hội">Tân Hội</option>
                                        </select>
                                        <span class="err-message"></span>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" placeholder="Tòa nhà, Tên đường" name="address_detail" class="input-f data-detail">
                                        <span class="err-message"></span>
                                    </div>
                                    <!--
                                    <div class="form-group">
                                        <input type="checkbox" id="save-info" name="save_info" class="save-info">
                                        <label for="save-info" class="title-save">Lưu làm địa chỉ mặc định</label>
                                    </div>
                                    -->
                                    <div class="form-group form-group-btn">
                                        <div class="btn btn-cancel close">
                                            Trở lại
                                        </div>
                                        <button class="btn btn-agree">
                                            Hoàn thành
                                        </button>
                                    </div>
                                </form>
                        </div>
                    </div>
                `;
            } else {
                return /*html*/ `
                    <div class="container">
                        <div class="row">
                            <div class="empty-cart">
                                <img src="./images/empty-cart.png" alt="" width="300px">
                                <a href="/#/products" class="btn btn-continue">Tiếp tục mua sản phẩm</a>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            return /*html*/ `
                    <div class="container">
                        <div class="row">
                            <div class="empty-cart">
                                <img src="./images/empty-cart.png" alt="" width="300px">
                                <a href="/#/products" class="btn btn-continue">Tiếp tục mua sản phẩm</a>
                            </div>
                        </div>
                    </div>
                `;
        }

    },

    async afterRender () { 

        const {data: listCart} = await cartApi.getAll();
        const userLogin = storage.getId();
        let dataStorage;
        
        if(userLogin) {
            dataStorage = storage.getId().user;

            const cartFollowUser = listCart.filter(cart => {
                return cart.userId == userLogin.user._id;
            })

            // xử lý thay đổi số lượng sp
            if(cartFollowUser.length >= 1) {
            const valueInput =  $('.value-quantity');
            if(Array.isArray(valueInput)) {
                valueInput.forEach(function (input) {
                    const bMinus = input.parentElement.querySelector('.btn-minus');
                    if(input.value > 1 || input.value != 1) {
                        bMinus.classList.remove('disable');
                    } else {
                        bMinus.classList.add('disable');
                    }
                })
            } else {
                const bMinus = valueInput.parentElement.querySelector('.btn-minus');
                if(valueInput.value > 1 || valueInput.value != 1) {
                    bMinus.classList.remove('disable');
                } else {
                    bMinus.classList.add('disable');
                }
            }

            // handle quantity
            optionQuantityProduct($('.btn-minus'), $('.btn-plus'), $('.value-quantity'), '.value-quantity', '.btn-minus', CartPage, '.main');
            
            // xóa sp trong cart
            const handleRemovePrd = async (idCart) => {
                try {
                    const removeCart = await cartApi.remove(idCart);
                    if(removeCart){
                        resetRender(CartPage, '.main');
                        resetRender(Header, '.header');
                    }
                } catch (error) {
                    
                }

            }
            // xóa sp trong cart
            const btnRemove = $('.remove-cart');
            if(Array.isArray(btnRemove)) {
                btnRemove.forEach(btn => {
                    btn.onclick = function () {
                        let idCart = this.dataset.id;
                        handleRemovePrd(idCart);
                    }
                })
            } else {
                btnRemove.onclick = function () {
                    let idCart = btnRemove.dataset.id;
                    handleRemovePrd(idCart);
                }
            }

            const paymentOrder = async (addressCustomer) => {             
                const order = {
                    userId: dataStorage._id,
                    ...addressCustomer
                }
                
                try{
                    const {data : orderUser} = await orderApi.add(order);
                    if(orderUser){
                        cartFollowUser.forEach( async (product)=> {
                            const orderDetail = {
                                orderId: orderUser._id,
                                prdId: product.prdId,
                                unitPrice: product.price,
                                quantity: product.quantity,
                                status: 1
                            }
                            
                            const finishOrder = await orderApi.addDetail(orderDetail);
                        })
                        
                        cartFollowUser.forEach( async (prd) => {
                            try{
                                const removeMultipleCart = await cartApi.removeMultiple(prd._id);
                                if(removeMultipleCart){
                                    resetRender(CartPage, '.main');
                                    resetRender(Header, '.header');
                                }
                            }catch(error){
                                
                            }

                        })
                        
                        alert('Đặt hàng thành công');
                        
                    }
                } catch (orderUser) {

                }

                
            }     
            

            const modelInfo = $('.box-info');
            $('.btn-finish').addEventListener('click', () => {
                modelInfo.style.display = 'block';
                Validator({
                    form: '.form-info',
                    formGroupSelector: '.form-group',
                    errorSelector: '.err-message',
                    rules: [
                      Validator.isRequired('.data-name'),
                      Validator.isRequired('.data-phone'),
                      Validator.isRequired('.data-capital'),
                      Validator.isRequired('.data-district'),
                      Validator.isRequired('.data-commune'),
                      Validator.isRequired('.data-detail')
                    ],
                    onSubmit: function (addressCustomer) {
                        paymentOrder(addressCustomer);
                    }
                })
            })

            $('.close').forEach(btnClose => {
                btnClose.addEventListener('click', () => {
                    modelInfo.style.display = 'none';
                })
            })

            window.addEventListener('click', (e) => {
                if(e.target === modelInfo) {
                    modelInfo.style.display = 'none';
                }
            })
            }
        }

        
        
        

        

    }
}

export default CartPage;