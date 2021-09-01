import categoryApi from './../api/categoryApi';
import productApi from './../api/productApi';
import slideApi from './../api/slideApi';
import postApi from './../api/postApi';

import { $, resetRender } from './../utils';
import { slide } from '../components/effect';
import Header from './../components/Header';
import addToCart from './../addToCart/addToCart';
import storage from './../storages/storage';


const HomePage = {
    async render() {
        window.scrollTo(0,0);
        const { data : {data: categories}} = await categoryApi.getAll();
        const { data : {data : products}  } = await productApi.getAll();
        const { data : {data : slides}  } = await slideApi.getAll();
        const { data : posts  } = await postApi.getAll();

        return /*html*/`
        <div class="container">
        <!-- slide -->
            <div class="row">
                <div class="col-lg-3">

                <!-- Danh mục sản phẩm -->
                    <nav class="nav-cate">
                        <h4 class="title-nav">Danh mục sản phẩm</h4>
                        <ul class="list-cate">
                            ${
                                categories.map(category => {
                                    return /*html*/`
                                        <li class="item-cate">
                                            <a href="/#/products/${category._id}" class="link-cate">
                                                <!--<img src="./../images/zoro.png" alt="" class="img-cate">-->
                                                <ion-icon name="person-outline"></ion-icon>
                                                ${category.name}
                                            </a>
                                        </li>
                                    `;
                                }).join('')
                            }
                        </ul>
                    </nav>
                </div>

                <div class="col-lg-9">
                    <div class="box">
                        
                    <!-- slide -->
                        <div class="box__slide">
                            ${
                                slides.map(slide => {
                                    return /*html*/ `
                                        <div class="slide">
                                            <img src="http://localhost:4000/api/slide/photo/${slide._id}" alt="" class="img-slide">
                                        </div>
                                    `;
                                }).join('')
                            }
                        </div>
                        <div class="control">
                            <button class="button btn-prev">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </button>
                            <button class="button btn-next">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- row cate product -->
            <div class="row-products">
                <div class="row">
                    <div class="group-categories">
                        <span class="run-title">
                            <marquee behavior="" direction="">
                                <i class="icon-gift fas fa-gift"></i>
                                <i class="icon-gift fas fa-gift"></i>
                                Shop đồ chơi, phụ kiên, Anime One piece hàng đầu tại việt nam và có rất nhiều phần quà hấp dẫn đang chơ bạn !!!
                            </marquee>
                        </span>
                    </div>
                </div>
            </div>

           <!-- product -->
			<div class="row-products">
                <h3 class="row-title">
                    HOT SALE
                    <img src="./images/lightning.png" alt="" class="img-hot-sale">
                </h3>

                <!-- product sale -->
                <div class="row">
                    ${
                        products.map((product, index) => {
                            if(product.sale !== 0 && product.sale !== null && product.sale !== 0) {
                         
                                let priceSale = ((100 - product.sale) / 100) * product.price;
                                return /*html*/ `
                                    <div class="col-lg-2 col-md-4 col-6 mt-4">
                                        <div class="card cart-prd">
                                            <a href="/#/product/${product._id}">
                                                <img src="http://localhost:4000/api/products/photo/${product._id}" class="card-img-top cart-img-prd" alt="...">
                                            </a>
                                            <div class="card-body">
                                                <h5 class="card-title">
                                                    <a href="/#/product/${product._id}" class="card-title-fix">${product.name}</a>
                                                </h5>
                                                <span class="card-price">Giá:
                                                    <span class="card-price__detail"> ${Math.ceil(priceSale).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                                                </span>
                                                <span class="card-status"> </span>
                                                <button class="btn btn-card add-cart" data-id="${product._id}">Add to cart</button>
                                            </div>
                                            <span class="price-sale">${product.sale}%</span>
                                        </div>
                                    </div>
                                `;
                            }
                        }).join('')
                    }
                </div>
            </div>


            <!-- product -->
            <div class="row-products">
                <h3 class="row-title">Sản phẩm đặc biệt</h3>
                <div class="row">
                    ${
                        products.map((product, index) => {
                            if(product.sale == null && product.type_prd == 1) {
                                return /*html*/ `
                                    <div class="col-lg-2 col-md-4 col-6 mt-4">
                                        <div class="card">
                                            <a href="/#/product/${product._id}">
                                                <img src="http://localhost:4000/api/products/photo/${product._id}" class="card-img-top cart-img-prd" alt="...">
                                            </a>
                                            <div class="card-body">
                                            <h5 class="card-title">
                                                <a href="/#/product/${product._id}" class="card-title-fix">${product.name}</a>
                                            </h5>
                                            <span class="card-price">Giá:
                                                <span class="card-price__detail"> ${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                                            </span>
                                            <span class="card-status"> </span>
                                            <button class="btn btn-card add-cart" data-id="${product._id}">Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }
                        }).join('')
                    }
                </div>
            </div>

            <!-- row cate product -->
            <div class="row-products">
                <div class="row">
                    <div class="group-categories">
                        <h3 class="row-title">Bài viết</h3>
                        <ul class="list-categories">
                            ${
                                categories.map(category => {
                                    return /*html*/`
                                    <li class="item-categories">
                                        <a href="/#/products/${category._id}" class="path-categories">
                                            
                                            <span class="name-categories">${category.name}</span>
                                        </a>
                                    </li>
                                    `;
                                }).join('')
                            }
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;
    },

    async afterRender() {
        // data products
        const { data : dataPrd } = await productApi.getAll();

        // slide
        slide($('.box'), $('.box__slide'), $('.slide'));
        const user = storage.getId();

        // add to cart
        if(user !== undefined) {
            addToCart(user.user, $('.add-cart'), 1);
        } else {
            addToCart(undefined, $('.add-cart'), 1);
        }
        
    }

}

export default HomePage;