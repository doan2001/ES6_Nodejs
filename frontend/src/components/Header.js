import productApi from "./../api/productApi";
import userApi from './../api/userApi';
import orderApi from './../api/orderApi';
import cartApi from './../api/cartApi';

import { $, resetRender } from "./../utils.js";

import HeaderMainSearch from "./HeaderMainSearch";

import storage from './../storages/storage';

const Header = {
    async render() {
        
        const userLogin = JSON.parse(localStorage.getItem("user"));
        const checkAdmin = storage.getId();
        let checkRole;

        const checkUser = () => {
            if (userLogin === null) {
                return /*html*/ `<a href="/#/sign-in" class="sign-in">Đăng nhập</a>`;
            } else {
                if(checkAdmin.user.role == 1){
                    checkRole = `<li class="item-model">
                                    <a href="/#/admin" class="path-model" id="next-page-admin">
                                        <span class="icon-model">
                                            <i class="fas fa-users-cog"></i>
                                        </span>
                                        <span class="title-model">Quản trị website</span>
                                    </a>
                                </li>`;
                } else {
                    checkRole = '';
                }
                return /*html*/ `
                    <span class="user-func">
                        <span class="user-func__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                        </span>
                        <div class="box-user toggle-user">
                            <ul class="list-model">
                                
                                <!-- check role -->
                                ${checkRole}

                                <li class="item-model">
                                    <a href="" class="path-model">
                                        <span class="icon-model">
                                            <i class="fas fa-cogs"></i>
                                        </span>
                                        <span class="title-model">Tài khoản của bạn</span>
                                    </a>
                                </li>
                                <li class="item-model">
                                    <a href="/#/purchase" class="path-model">
                                        <span class="icon-model">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
                                                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                        </span>
                                        <span class="title-model">Đơn hàng</span>
                                    </a>
                                </li>
                                <li class="item-model">
                                    <a href="javascript:void(0)" class="path-model sign-out">
                                        <span class="icon-model">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                            </svg>
                                        </span>
                                        <span class="title-model">Đăng xuất</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </span>
                `;
            }
        };

        return /*html*/ `
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top header-color" id="header">
            <div class="container">
                <a class="navbar-brand logo" href="/#/">
                    <img src="./images/logo.png" alt="" class="logo__img">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                            <a class="nav-link link-main" href="/#/">Trang chủ</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link link-main" href="/#/products">Sản phẩm</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link link-main" href="/#/posts">Bài viết</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link link-main" href="/#/feed-back">Liên hệ</a>
                        </li>
                    </ul>
                    
                    ${HeaderMainSearch.render()}
                    
                    <a href="/#/carts" class="cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                        <span class="cart-quantity">0</span>
                    </a>

                    ${checkUser()}
                </div>
            </div>
        </nav>
        `;
    },

    async afterRender() {
        HeaderMainSearch.afterRender();

        // box control user
        const userInfo = storage.getId();
        if (userInfo !== undefined) {
            // hiển thị tổng số sp trong giỏ hàng theo từng use
            const {data : carts} = await cartApi.getAll();
            const filterCart = carts.filter(cart => {
                return cart.userId == userInfo.user._id;
            })
            let totalCart = 0;
            filterCart.forEach(cart => {
                totalCart += cart.quantity;
            })
            $('.cart-quantity').innerHTML = totalCart;


            // toggle btn user
            $(".user-func__icon").addEventListener("click", () => {
                $(".box-user").classList.toggle("toggle-user");
            });

            // sign out
            $(".sign-out").addEventListener("click", async () => {
                localStorage.removeItem('user');
                window.location.reload();
            });
        }
    },
};

export default Header;
