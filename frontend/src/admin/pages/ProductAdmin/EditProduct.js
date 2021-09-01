import Validator from './../../../components/ValidationForm';

import categoryApi from './../../../api/categoryApi';
import productApi from '../../../api/productApi';

import { $, currentURL } from './../../../utils';

const EditProduct = {
    async render() {
        const prdId = currentURL().id;
        const { data: { data: categories } } = await categoryApi.getAll();
        const { data: product } = await productApi.get(prdId);

        return /*html*/ `
            <div class="container-fluid mt-4">
                <div class="row row-table">
                    
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between">
                            <h2>Sửa sản phẩm <mark>${product.name}</mark></h2>
                        </div>

                        <form class="row form-edit" method="POST" action="">
                            <div class="col col-lg-6">
                                <div class="group-form">
                                    <label for="exampleInputEmail1" class="form-label">Tên</label>
                                    <input type="text" class="form-control name-prd" id="exampleInputEmail1" name="name" value="${product.name}">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="exampleInputPassword1" class="form-label">Danh mục</label>
                                    <select class="form-select cate-prd" aria-label="Default select example" name="categoryId">
                                        <option selected value="">-- Chọn danh mục --</option>
                                        ${
                                            categories.map(cate => {
                                                let selected = '';
                                                if(cate._id == product.categoryId){
                                                    selected = 'selected';
                                                }
                                                return /*html*/ `
                                                    <option value="${cate._id}" ${selected}>${cate.name}</option>
                                                `;
                                            }).join('')
                                        }
                                    </select>
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="form-label">Giá</label>
                                    <input type="number" class="form-control price-prd" id="exampleCheck1" name="price" value="${product.price}">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="form-label">Sale</label>
                                    <input type="number" class="form-control price-prd" id="exampleCheck1" name="sale" value="${product.sale}">
                                    <span class="err-message"></span>
                                </div>
                            </div>
                            <div class="col col-lg-6">
                                <div class="group-form">
                                    <label for="" class="form-label">Ảnh</label>
                                    <input type="file" class="form-control photo-prd" id="exampleCheck1" name="photo">
                                    <img src="http://localhost:4000/api/products/photo/${product._id}" alt="" width="100px" height="120px" class="mt-3">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="exampleInputPassword1" class="form-label">Mô tả</label>
                                    <textarea class="form-control des-prd" name="description" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px">${product.description}</textarea>
                                    <span class="err-message"></span>
                                </div>
                            </div>
                            <div class="col col-lg-12 mt-5">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>

                    </main>
                </div>
            </div>
        `;
    },

    async afterRender() {
        const prdId = currentURL().id;
        const { data: productById } = await productApi.get(prdId);

        Validator({
            form: '.form-edit',
            formGroupSelector: '.group-form',
            errorSelector: '.err-message',
            rules: [
                Validator.isRequired('.name-prd', 'Vui lòng nhập tên'),
                // Validator.isRequired('.cate-prd', 'Vui lòng chọn danh mục'),
                Validator.isRequired('.price-prd', 'Vui lòng nhập giá'),
                Validator.isRequired('.des-prd', 'Vui lòng nhập mô tả'),
            ],
            onSubmit: async function (product) {
                
                const prd = new FormData();
                prd.append('name', product.name);
                prd.append('categoryId', product.categoryId);
                prd.append('price', product.price);
                prd.append('sale', product.sale);
                // prd.append('photo', product.photo);
                prd.append('description', product.description);
                const image = $(".photo-prd").files[0];
                
                if(image){
                    prd.append('photo', image);
                }
                
                const {data} = await productApi.update(prdId, prd);

                try{
                    if(data){
                        window.location.href='/#/admin_product';
                        window.location.reload();
                    }
                }catch(error){

                }

            }
            
        
        })

    }
}

export default EditProduct;