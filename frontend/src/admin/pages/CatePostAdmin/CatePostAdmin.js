import catePostApi from '../../../api/catePostApi';
import { $, resetRender } from './../../../utils';

const CatePostAdmin = {
    async render (){
        const { data : catePost } = await catePostApi.getAll();

        return /*html*/ `
        <div class="container-fluid mt-4 list-cate">
            <div class="row row-table">
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between">
                        <h2>Danh sách thể loại bài viết</h2>
                        <a href="/#/admin_cate-post_add" class="btn btn-primary fs-4">Thêm danh mục</a>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Danh mục bài viết</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    catePost.map((cate, index) => {
                                        return /*html*/ `
                                            <tr>
                                                <td>${index + 1}</td>
                                                <td>${cate.name}</td>
                                                <td>
                                                    <a class="btn btn-primary fs-4" href="/#/admin_cate-post_edit/${cate._id}">Sửa</a>
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

    async afterRender() {
        const btnRemove = $('.btn-danger');
        
        if(Array.isArray(btnRemove)){
            btnRemove.forEach(btn => {
                btn.onclick = async () => {
                    const id = btn.dataset.id;
                    const question = confirm('Bạn có muốn xóa ?');
                    if(question){
                        console.log(id);
                        await catePostApi.remove(id);
                        resetRender(CatePostAdmin, '.list-cate');
                    }
                }
            })
        } else {
            btnRemove.onclick = async () => {
                const id = btnRemove.dataset.id;
                const question = confirm('Bạn có muốn xóa ?');
                if(question){
                    console.log(id);
                    await catePostApi.remove(id);
                    resetRender(CatePostAdmin, '.list-cate');
                }
            }
        }
    }
}


export default CatePostAdmin;