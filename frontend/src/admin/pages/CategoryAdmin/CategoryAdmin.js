import categoryApi from './../../../api/categoryApi';
import { $, resetRender } from './../../../utils';

const CategoryAmin = {
    async render () {
        const {data : {data: categories}} = await categoryApi.getAll();
       
        return /*html */ `
            <div class="container-fluid mt-4 list-cate">
                <div class="row row-table">
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between">
                            <h2>Danh sách danh mục</h2>
                            <a href="/#/admin_category_add" class="btn btn-primary fs-4">Thêm danh mục</a>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Tên</th>
                                    <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${
                                        categories.map((cate, index) => {
                                            return /*html*/ `
                                                <tr>
                                                    <td>${index + 1}</td>
                                                    
                                                    <td>${cate.name}</td>
                                                    <td>
                                                        <a href="/#/admin_category_edit/${cate._id}" class="btn btn-primary fs-4">Sửa</a>
                                                        <button class="btn btn-danger fs-4" data-id="${cate._id}">Xóa</button>
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

    afterRender () {
        const btnRemove = $('.btn-danger');
        if(Array.isArray(btnRemove)){
            btnRemove.forEach(btn => {
                btn.onclick = async () => {
                    const id = btn.dataset.id;
                    const question = confirm('Bạn có muốn xóa ?');
                    if(question){
                        await categoryApi.remove(id);
                        resetRender(CategoryAmin, '.list-cate');
                    }
                }
            })
        }

    }
}

export default CategoryAmin;