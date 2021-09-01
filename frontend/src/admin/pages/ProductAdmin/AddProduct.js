import Validator from './../../../components/ValidationForm';

import categoryApi from './../../../api/categoryApi';
import productApi from '../../../api/productApi';

import { $ } from './../../../utils';

const AddProduct = {
    async render() {
        const { data: { data: categories } } = await categoryApi.getAll();
        
        return /*html*/ `
            <div class="container-fluid mt-4">
                <div class="row row-table">
                    
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between">
                            <h2>Thêm sản phẩm</h2>
                        </div>

                        <form class="row form-add" method="POST" action="">
                            <div class="col col-lg-6">
                                <div class="group-form">
                                    <label for="exampleInputEmail1" class="form-label">Tên</label>
                                    <input type="text" class="form-control name-prd" id="exampleInputEmail1" name="name">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="exampleInputPassword1" class="form-label">Danh mục</label>
                                    <select class="form-select cate-prd" aria-label="Default select example" name="categoryId">
                                        <option selected value="">-- Chọn danh mục --</option>
                                        ${
                                            categories.map(cate => {
                                                return /*html*/ `
                                                    <option value="${cate._id}">${cate.name}</option>
                                                `;
                                            }).join('')
                                        }
                                    </select>
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="form-label">Giá</label>
                                    <input type="number" class="form-control price-prd" id="exampleCheck1" name="price">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="form-label">Sale</label>
                                    <input type="number" class="form-control" id="exampleCheck1" name="sale">
                                    <span class="err-message"></span>
                                </div>
                            </div>
                            <div class="col col-lg-6">
                                <div class="group-form">
                                    <label for="" class="form-label">Ảnh</label>
                                    <input type="file" class="form-control photo-prd" id="exampleCheck1" name="photo">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="exampleInputPassword1" class="form-label">Mô tả</label>
                                    <textarea class="form-control des-prd" name="description" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Sản phẩm đặc biệt
                                    </label>
                                    <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" name="type_prd">
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

        Validator({
            form: '.form-add',
            formGroupSelector: '.group-form',
            errorSelector: '.err-message',
            rules: [
                Validator.isRequired('.name-prd', 'Vui lòng nhập tên'),
                Validator.isRequired('.cate-prd', 'Vui lòng chọn danh mục'),
                Validator.isRequired('.price-prd', 'Vui lòng nhập giá'),
                Validator.isRequired('.des-prd', 'Vui lòng nhập mô tả'),
            ],
            onSubmit: async function (product) {
                
                const prd = new FormData();
                prd.append('name', product.name);
                prd.append('categoryId', product.categoryId);
                prd.append('price', product.price);
                prd.append('sale', product.sale);
                prd.append('photo', product.photo);
                prd.append('description', product.description);
                prd.append('type_prd', product.type_prd);

                const {data} = await productApi.add(prd);
                
                try{
                    if(data){
                        window.location.href='/#/admin_product';
                    }
                }catch(error){

                }

            }
            
        
        })

    }
}

export default AddProduct;