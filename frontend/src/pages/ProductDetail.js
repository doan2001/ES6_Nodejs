import { $, currentURL, resetRender } from './../utils.js';
import productApi from './../api/productApi';
import categoryApi from './../api/categoryApi';

import { optionQuantityProduct } from './../components/effect.js';
import Header from './../components/Header';
import CommentDetail from './../components/CommentDetail';
import addToCart from './../addToCart/addToCart';
import storage from './../storages/storage';



const ProductDetail = {
    async render () {
        window.scrollTo(0,0);
        const { id } = currentURL();
        const {data : product} = await productApi.get(id);
        const {data : {data: products}} = await productApi.getAll();
        const {data : {data: categories}} = await categoryApi.getAll();
        
        // xử lý sp có sale và không có sale
        let percentSale;
        if(product.sale == null || product.sale == '') {
            percentSale = `
            <span class="detail-prd product-price">Giá: 
                <span class="title-highlight">${product.price} đ</span>
            </span>
            `;
        } else {
            let priceNew = ((100 - parseInt(product.sale)) / 100) * product.price;
            percentSale = `
                <span class="detail-prd product-price"> 
                    <span class="percent-sale">Sale : ${product.sale}%</span>
                    <span class="price-old">${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                </span>

                <span class="detail-prd product-price">Giá: 
                    <span class="title-highlight">${Math.ceil(priceNew).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                </span>
            `;
        }

        // Lấy tên danh mục
        let cateName;
        categories.forEach(cate => {
            if(cate._id == product.categoryId){
                cateName = cate.name;
            }
        })

        // lấy ra sản phẩm tương tự
        let sameProduct = products.filter(prd => {
            return prd.categoryId == product.categoryId
        })

        return /*html*/ `
        <div class="container">
            <div class="detail-top">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="product-img">
                            <img src="http://localhost:4000/api/products/photo/${product._id}" alt="" class="product-img__main">
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="product-detail">
                            <h3 class="product-name">${product.name}</h3>
                            <span class="detail-prd">Thể loại: 
                                <span class="title-highlight product-cate">
                                    ${cateName}
                                </span>
                            </span>
                            
                            ${percentSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}

                            <div action="" class="form-quantity">
                                <div class="group-quantity">
                                    <span class="product-group__title">Số lượng: </span>
                                    <div class="control-quantity">
                                        <button class="btn-quantity btn-minus disable">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <input type="number" class="value-quantity" value='1'>
                                        <button class="btn-quantity btn-plus">
                                            <i class="fas fa-plus"></i>
                                        </button>	
                                    </div>
                                </div>
                                <button class="btn-add" data-id="${product._id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"></path>
                                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                                    </svg>
                                    <span class="btn-add__title">
                                        Thêm vào giỏ hàng
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="service">
                            <h4 class="service__title">Ưu đãi thêm</h4>
                            <ul class="list-service">
                                <li class='list-service__item'>
                                    <div class="service-box">
                                        <img src="./images/luffy.png" alt="" class="service-box__img">
                                        <span class="service-box__name">Tặng cho khách lần đầu mua hàng online tại web</span>
                                    </div>
                                    <ul class="sub-service">
                                        <li class="list-service__item">
                                            <div class="service-box">
                                                <img src="./images/fire.png" alt="" class="service-box__img-sub">
                                                <span class="service-box__name">5 lần FreeShip</span>
                                            </div>
                                        </li>
                                        <li class="list-service__item">
                                            <div class="service-box">
                                                <img src="./images/fire.png" alt="" class="service-box__img-sub">
                                                <span class="service-box__name">Tăng thêm 100k cho đơn hàng từ 500k trở lên</span>
                                            </div>
                                        </li>
                                        <li class="list-service__item">
                                            <div class="service-box">
                                                <img src="./images/fire.png" alt="" class="service-box__img-sub">
                                                <span class="service-box__name">Combo mua 2 tặng 1</span>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li class="list-service__item">
                                    <div class="service-box">
                                        <img src="./images/luffy.png" alt="" class="service-box__img">
                                        <span class="service-box__name">Tặng cho khách lần đầu mua hàng online tại web</span>
                                    </div>
                                    <ul class="sub-service">
                                        <li class="list-service__item">
                                            <div class="service-box">
                                                <img src="./images/fire.png" alt="" class="service-box__img-sub">
                                                <span class="service-box__name">5 lần FreeShip</span>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="detail-info">
                <div class="row">
                    <div class="col-lg-9">
                        <div class="detail-group">
                            <h2 class="detail-info__title">Thông tin sản phẩm</h2>
                            <div class="detail-box">
                                <span class="detail-group__title">Tên sản phẩm: </span>
                                <span class="detail-group__name">${product.name}</span>
                            </div>
                            <div class="detail-box">
                                <span class="detail-group__title">Tên danh mục: </span>
                                <span class="detail-group__name">${cateName}</span>
                            </div>
                            <div class="detail-box">
                                <span class="detail-group__title">Mô tả: </span>
                                <span class="detail-group__name">${product.description}</span>
                            </div>
                            <div class="detail-box">
                                <span class="detail-group__title">Website: </span>
                                <span class="detail-group__name"></span>
                            </div>
                            <div class="detail-box">
                                <span class="detail-group__title">Liên hệ: </span>
                                <span class="detail-group__name">0394570220</span>
                            </div>
                        </div>

                        <div class="cmt-product">
                           ${await CommentDetail.render()}
                        </div>

                    </div>
                    <div class="col-lg-3">
                        <div class="product-other">
                            <h3 class="detail-info__title">Sản phẩm khác</h3>
                            ${
                                sameProduct.map((prd, index) => {
                                    if(index < 3) {
                                        return /*html*/ `
                                            <div class="product-other__group">
                                                <img src="http://localhost:4000/api/products/photo/${prd._id}" alt="" class="product-other__img">
                                                <h5 class="product-other__title">${prd.name}</h5>
                                            </div>
                                        `;
                                    }
                                }).join('')
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }, 

    async afterRender () {
        await CommentDetail.afterRender();
        optionQuantityProduct($('.btn-minus'), $('.btn-plus'), $('.value-quantity'));
        let valueQuantity = parseInt($('.value-quantity').value);
        const user = storage.getId();
        if(user !== undefined) {
            addToCart(user.user, [$('.btn-add')], valueQuantity);
        } else {
            addToCart(undefined, [$('.btn-add')], valueQuantity);
        }
    }
}

export default ProductDetail;