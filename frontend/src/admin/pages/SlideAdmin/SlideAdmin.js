import slideApi from './../../../api/slideApi';
import { $, resetRender} from './../../../utils';

const SlideAdmin = {
    async render () {
        const {data : {data: slides}} = await slideApi.getAll();
        return /*html */ `
            <div class="container-fluid mt-4 list-slide">
                <div class="row row-table">
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between">
                            <h2>Danh sách slide</h2>
                            <a href="/#/admin_slide_add" class="btn btn-primary fs-4">Thêm slide</a>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Ảnh</th>
                                    <th>Link liên kết</th>
                                    <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${
                                        slides.map((slide, index) => {
                                            return /*html*/ `
                                                <tr>
                                                    <td>${index + 1}</td>
                                                    <td>
                                                        <img src="http://localhost:4000/api/slide/photo/${slide._id}" alt="" width="200px" height="70px">
                                                    </td>
                                                    <td>${slide.pathImage}</td>
                                                    <td>
                                                        <a href="/#/admin_slide_edit/${slide._id}" class="btn btn-primary fs-4">Sửa</a>
                                                        <button class="btn btn-danger fs-4" data-id="${slide._id}">Xóa</button>
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

    afterRender(){
        const btnRemove = $('.btn-danger');
        if(Array.isArray(btnRemove)){
            btnRemove.forEach(btn => {
                btn.onclick = async () => {
                    const id = btn.dataset.id;

                    const question = confirm('Bạn có muốn xóa ?');
                    if(question){
                        await slideApi.remove(id);
                        resetRender(SlideAdmin, '.list-slide');
                    }
                }
            })
        }

    }
}

export default SlideAdmin;