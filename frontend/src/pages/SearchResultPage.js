import ProductControl from './../components/ProductControl';
import ProductPagination from './../components/ProductPagination';
import productApi from './../api/productApi';
import addToCart from './../addToCart/addToCart';
import {currentURL, $} from './../utils';
import storage from './../storages/storage';

const SearchResultPage = {
    async render () {
        window.scrollTo(0, 0);
        const key = JSON.parse(sessionStorage.getItem('key'));
        const {data: searchResults} = await productApi.search(key);

        const results = () => {
            if(searchResults.length >= 1) {
                const renderResult = searchResults.map(product => {
                    // tính giá sp đã trừ sale
                    let checkSale;
                    let priceSale;
                    if(product.sale == undefined || product.sale == '') {
                        checkSale = `<span class=""></span>`;
                    } else {
                        priceSale = ((100 - product.sale) / 100) * product.price;
                        checkSale = `<span class="price-sale ">${product.sale}%</span>`
                    }

                    return /*html*/ `
                        <div class="col-lg-2 col-md-4 col-6">
                            <div class="card mt-4">
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
                                    <button class="btn btn-card add-cart" data-id="${product._id}">Add to cart</button>
                                </div>
                                ${checkSale}
                            </div>
                        </div>
                    `;
                }).join('')
                return renderResult;
            } else {
                return /*html*/ `
                    <div class="empty-result">
                        <img src="./images/no_results_found.png" alt="" class="empty-result__img">
                    </div>
                `;
            }
        }

        return /*html*/`
            <div class="container" id='list-products'>		
                <div class="row">
                    <div class="col-12">
                        <div class="search-result">
                            <h4 class="search-result__value">
                                Kết quả tìm kiếm cho từ khóa '
                                <span class="key-search">${key}</span> '
                            </h4>
                        </div>
                    </div>
                </div>

                <!-- row control product -->
                ${ProductControl.render()}
    
                <!-- product -->
                <div class="row-products" id="sort">
                    <div class="row">
                        <!-- hiển thị kết quả tìm kiếm -->
                        ${results()}
                        
                    </div>
                </div>
    
                <!-- paginate -->
                ${ProductPagination.render()}
            </div>
            `;
    },

    afterRender () {
        const user = storage.getId();
        if(user !== undefined) {
            addToCart(user.user, $('.add-cart'), 1);
        } 
    }
}

export default SearchResultPage;