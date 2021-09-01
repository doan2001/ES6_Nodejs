import { currentURL, $, resetRender, getUrlParams } from './utils.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

import HomePage from './pages/HomePage';
import SearchResultPage from './pages/SearchResultPage';

import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';

// import CategoriesPage from './pages/CategoriesPage';

import CartPage from './pages/CartPage';
import PurchasePage from './pages/PurchasePage';

import PostPage from './pages/PostPage';
import PostDetailPage from './pages/PostDetailPage';

import FeedBackPage from './pages/FeedBackPage';

import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';
// import LoginBackendPage from './pages/LoginBackendPage';

// import db from './../config/db/index';
// db.connect();

import Error404 from './pages/Error404';

// ------------ ADMIN --------------
import Dashboard from './admin/pages/Dashboard';
import NavbarAdmin from './components/NavbarAdmin'

import ProductAdmin from './admin/pages/ProductAdmin/ProductAdmin';
import AddProduct from './admin/pages/ProductAdmin/AddProduct';
import EditProduct from './admin/pages/ProductAdmin/EditProduct';

import SlideAdmin from './admin/pages/SlideAdmin/SlideAdmin';
import AddSlide from './admin/pages/SlideAdmin/AddSlide';
import EditSlide from './admin/pages/SlideAdmin/EditSlide';

import CategoryAdmin from './admin/pages/CategoryAdmin/CategoryAdmin';
import AddCategory from './admin/pages/CategoryAdmin/AddCategory';
import EditCategory from './admin/pages/CategoryAdmin/EditCategory';

import CommentAdmin from './admin/pages/CommentAdmin/CommentAdmin';
import DetailCmtAdmin from './admin/pages/CommentAdmin/DetailCmtAdmin';

import FeedbackAmin from './admin/pages/FeedbackAdmin/FeedbackAdmin';

import UserAdmin from './admin/pages/UserAdmin/UserAdmin';
import EditUser from './admin/pages/UserAdmin/EditUser';

import catePostAdmin from './admin/pages/catePostAdmin/catePostAdmin';
import AddCatePost from './admin/pages/catePostAdmin/AddCatePost';
import EditCatePost from './admin/pages/catePostAdmin/EditCatePost';

import PostAdmin from './admin/pages/PostAdmin/PostAdmin';
import AddPost from './admin/pages/PostAdmin/AddPost';

import OrderAdmin from './admin/pages/OrderAdmin/OrderAdmin';
import DetailOrder from './admin/pages/OrderAdmin/DetailOrder';


const url = getUrlParams(window.location.href);

// define path
const routes = {
    '/': HomePage,
    '/search/:id': SearchResultPage,

    '/products': ProductsPage,
    '/products/:id': ProductsPage,
    
    '/product/:id': ProductDetail,

    // '/categories/:id': CategoriesPage,

    '/posts': PostPage,
    '/posts/:id': PostPage,
    '/post/:id': PostDetailPage,

    '/carts': CartPage,
    '/purchase': PurchasePage,

    '/feed-back': FeedBackPage,

    '/sign-in': SignIn,
    '/sign-up': SignUp,
    
    // ------------------- ADMIN ----------------
    
    '/admin': Dashboard,
    '/admin_product': ProductAdmin,
    '/admin_product_add': AddProduct,
    '/admin_product_edit/:id': EditProduct,

    '/admin_slide': SlideAdmin,
    '/admin_slide_add': AddSlide,
    '/admin_slide_edit/:id': EditSlide,

    '/admin_category': CategoryAdmin,
    '/admin_category_add': AddCategory,
    '/admin_category_edit/:id': EditCategory,

    '/admin_comment': CommentAdmin,
    '/admin_detail-cmt/:id': DetailCmtAdmin,

    '/admin_feedback': FeedbackAmin,

    '/admin_user': UserAdmin,
    '/admin_user_edit/:id': EditUser,

    '/admin_cate-post': catePostAdmin,
    '/admin_cate-post_add': AddCatePost,
    '/admin_cate-post_edit/:id': EditCatePost, 

    '/admin_post': PostAdmin,
    '/admin_post_add': AddPost,

    '/admin_order': OrderAdmin,
    '/admin_order_detail/:id': DetailOrder
    
}

const router = async () => {
    // handle path
    const { resource , id, abc } = currentURL(); 

    const handlePath = (resource ? `/${resource}` : '/') + (id ? `/:id` : '');
    const page = routes[handlePath] ? routes[handlePath] : Error404;

    // header
    if(handlePath.indexOf('/admin') != -1){
        $('.header').innerHTML = await NavbarAdmin.render();
        if(NavbarAdmin.afterRender !== undefined || NavbarAdmin.afterRender !== ''){
            await NavbarAdmin.afterRender();
        }
        
    }else {
        $('.header').innerHTML = await Header.render();
        if(Header.afterRender !== undefined || Header.afterRender !== ''){
            await Header.afterRender();
        }

    }
    
    // main
    $('.main').innerHTML = await page.render();
    
    if(page.afterRender !== undefined) {
        await page.afterRender();
    }
    
    // footer
    $('.footer').innerHTML = await Footer.render();
    
}

// event
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);