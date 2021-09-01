import productApi from '../../../api/productApi';
import categoryApi from '../../../api/categoryApi';

import { $, resetRender} from './../../../utils';

const ProductAdmin = {
    async render (resultFilter){
        
        let products;
        if(resultFilter != undefined) {
            products = resultFilter
        } else {
            const { data : {data : dataProduct} } = await productApi.getAll();
            products = dataProduct;
        }
        const { data : {data : categories} } = await categoryApi.getAll();

        
        return /*html*/ `
        
        <div class="container-fluid mt-4 list-product">
            <div class="row row-table">
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between">
                        <h2>Danh sách sản phẩm</h2>
                        <a href="/#/admin_product_add" class="btn btn-primary fs-4">Thêm sản phẩm</a>
                    </div>
                    <form class="mt-4">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Tìm kiếm sản phẩm</label>
                            <input type="text" class="form-control w-25 filter-product" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Sản phẩm ?">
                        </div>
                    </form>
                    <div class="table-responsive table-prd">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên</th>
                                    <th>Ảnh</th>
                                    <th>Danh mục</th>
                                    <th>Sale</th>
                                    <th>Giá (Chưa trừ sale)</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    products.map((product, index) => {
                                        let catName = '';
                                        categories.map(cate => {
                                            if(cate._id == product.categoryId){
                                                catName = cate.name;
                                            }
                                        })
                                        
                                        return /*html*/ `
                                            <tr>
                                                <td>${index + 1}</td>
                                                <td class="td-name">${product.name}</td>
                                                <td>
                                                    <img src="http://localhost:4000/api/products/photo/${product._id}" alt="" width="64px" height="64px">
                                                </td>
                                                <td>${catName}</td>
                                                <td>${product.sale ? `${product.sale}%` : ''}</td>
                                                <td>${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                                                <td class="td-des">${product.description}</td>
                                                <td>
                                                    <a class="btn btn-primary fs-4" href="/#/admin_product_edit/${product._id}">Sửa</a>
                                                    <button class="btn btn-danger btn-remove fs-4" data-id="${product._id}">Xóa</button>
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

    async afterRender(){
        // xóa
        const btnRemove = $('.btn-remove');
        if(Array.isArray(btnRemove)){
            btnRemove.forEach(btn => {
                btn.onclick = async () => {
                    const id = btn.dataset.id;
                    const question = confirm('Bạn có muốn xóa ?');
                    if(question){
                        await productApi.remove(id);
                        resetRender(ProductAdmin, '.list-product');
                    }
                }
            })
        }

        
        // filter product on input
        const { data : {data : products} } = await productApi.getAll();
        const inputFilter =  $('.filter-product');
        
        inputFilter.oninput = () => {
            const valueFilter = inputFilter.value.trim().toLowerCase();
            const resultFilter = products.filter(prd => {
                return prd.name.toLowerCase().indexOf(valueFilter) !== -1;
            })

            // resetRender(ProductAdmin, '.table-prd', resultFilter);
            resetRender(ProductAdmin, '.list-product', resultFilter);
        }
    }
}


export default ProductAdmin;