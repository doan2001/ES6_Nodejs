import productApi from './../api/productApi';
import categoryApi from './../api/categoryApi';
import { currentURL, $, resetRender, pagination } from './../utils';
import Header from './../components/Header';
import ProductControl from './../components/ProductControl';
import ProductPagination from './../components/ProductPagination';
import addToCart from './../addToCart/addToCart';
import storage from './../storages/storage';


const ProductsPage = {
    async render(data) {
        window.scrollTo(0, 0);
        let idCate = currentURL().id;
        let products;
        let cateName;

        if (idCate === undefined) {
            // show all prd
            if (data !== undefined) {
                // hiển thị tất cả sản phẩm đã sắp xếp
                products = data;
            } else {
                // hiển thị tất cả sản phẩm
                let { data : {data: result} } = await productApi.getAll();
                products = result;
            }
        } else {
            // lọc theo danh mục
            // if (data !== undefined) {
            //     products = data;
            // } else {
            //     let data = await productApi.getAll();
            //     products = data.data;
            // }
            let { data : {data: result} } = await productApi.getAll();
            // lấy sản phẩm theo danh mục
            products = result.filter(product => product.categoryId === idCate);

            // // lấy tên theo danh mục
            const {data: cate} = await categoryApi.get(idCate);
            cateName = cate.name;
        }
        
        // hiển thị theo tên danh mục
        let result = '';
        if(cateName && idCate !== undefined) {
            result = `<div class="search-result">
                    <h4 class="search-result__value">
                        Danh mục sản phẩm '
                        <span class="key-search">${cateName}</span> '
                    </h4>
                </div>`
        } else {
            result = `
            <div class="search-result">
                <h4 class="search-result__value">
                <span class="key-search">Tất cả sản phẩm</span>
                     
                </h4>
            </div>
            `;
        }
        return /*html*/`
            <div class="container" id='list-products'>	
                <div class="row">
                    <div class="col-12">
                        ${result}
                    </div>
                </div>

                <!-- row control product -->
                ${ProductControl.render()}		
    
                <!-- product -->
                <div class="row-products" id="sort">
                    <div class="row" id="sale">
                        ${
                            products.map((product, index) => {
                                // giá sale
                                let checkSale;
                                let priceSale;
                                if(product.sale == undefined || product.sale == '') {
                                    checkSale = `<span class=""></span>`;
                                } else {
                                    priceSale = ((100 - product.sale) / 100) * product.price;
                                    checkSale = `<span class="price-sale ">${product.sale}%</span>`
                                }

                                return /*html*/`
                                    <div class="col-lg-2 col-md-4 col-6">
                                        <div class="card mt-4 cart-prd">
                                            <a href="/#/product/${product._id}">
                                                <img src="http://localhost:4000/api/products/photo/${product._id}" class="card-img-top cart-img-prd" alt="...">
                                            </a>
                                            <div class="card-body">
                                                <h5 class="card-title">
                                                    <a href="/#/product/${product._id}" class="card-title-fix">${product.name}</a>
                                                </h5>
                                                <span class="card-price">Giá:
                                                    <span class="card-price__detail"> ${priceSale ? priceSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                                                </span>
                                                <span class="card-status"></span>
                                                <button class="btn btn-card add-cart" data-id=${product._id}>Add to cart</button>
                                            </div>
                                            ${checkSale}
                                        </div>
                                    </div>
                                `;
                            }).join('')
                        }
                    </div>
                </div>
    
                <!-- paginate -->
                ${ProductPagination.render()}
            `;

    },

    async afterRender() {
        ProductControl.afterRender();
        ProductPagination.afterRender();

        // add to cart
        const user = storage.getId();
        if(user !== undefined) {
            addToCart(user.user, $('.add-cart'), 1);
        } else {
            addToCart(undefined, $('.add-cart'), 1);
        }
    }
}

export default ProductsPage;