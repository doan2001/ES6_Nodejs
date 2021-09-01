import Validator from './../../../components/ValidationForm';
import categoryApi from './../../../api/categoryApi';
import { $, resetRender, currentURL } from './../../../utils';

const EditCategory = {
    async render () {
        const idCate = currentURL().id;
        const {data : category} = await categoryApi.get(idCate);

        return /*html */ `
            <div class="container-fluid mt-4 list-cate">
                <div class="row row-table">
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between">
                            <h2>Sửa danh mục</h2>
                        </div>
                        
                        <form class="row form-add" method="POST" enctype="multipart/form-data">
                            <div class="col col-lg-6">
                                <div class="group-form">
                                    <label for="exampleInputEmail1" class="form-label">Tên</label>
                                    <input type="text" class="form-control name-cate" id="exampleInputEmail1" name="name" value="${category.name}">
                                    <span class="err-message"></span>
                                </div>
                            </div>
                            <div class="col col-lg-12">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        `;
    },

    afterRender() {
        Validator({
            form: '.form-add',
            formGroupSelector: '.group-form',
            errorSelector: '.err-message',
            rules: [
                Validator.isRequired('.name-cate', 'Vui lòng nhập tên danh mục'),
            ],
            onSubmit: async function (category) {
                const idCate = currentURL().id;
                const {data : {data : newCate}} = await categoryApi.edit(idCate, category);
               
                try{
                    if(newCate){
                        window.location.href = '/#/admin_category';
                    }
                }catch(error) {
                    // console.log('Thêm danh mục không thanh công !')
                    console.log(error.response.data.error);
                }
            }
            
           
        })
    }
}

export default EditCategory;