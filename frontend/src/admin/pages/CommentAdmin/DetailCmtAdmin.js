import commentApi from '../../../api/commentApi';
import userApi from '../../../api/userApi';
import productApi from '../../../api/productApi';

import { $, resetRender, currentURL } from './../../../utils';

const DetailCmtAdmin = {
    async render (){
        const idPrd = currentURL().id;
        const {data : dataCmt} = await commentApi.getAll();
        const {data : dataUser} = await userApi.getAllUser();
        const {data : product} = await productApi.get(idPrd);
        
        let listDetailCmt = [];
        // lấy ra các cmt có cùng id sản phẩm
        const listCmt = dataCmt.filter(cmt => {
            return cmt.prdId == idPrd;
        })
        
        // Lấy ra user cmt
        const userCmt = dataUser.forEach(user => {
            const result = listCmt.map(cmt => {
                if(cmt.userId == user._id){
                    return {
                        id: cmt._id,
                        content: cmt.content,
                        timeCmt: cmt.createdAt,
                        user: user.name
                    }
                }
            })
            listDetailCmt.push(...result);
        })
        

        return /*html*/ `
        <div class="container-fluid mt-4 list-cmt-detail">
            <div class="row row-table">
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between">
                        <h2>Chi tiết bình luận: <mark>${product.name}</mark></h2>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nội dung</th>
                                    <th>Ngày bình luận</th>
                                    <th>Người bình luận</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    listDetailCmt.map((cmt, index) => {
                                        if(cmt !== undefined) {
                                            return /*html*/ `
                                                <tr>
                                                    <td>${index + 1}</td>
                                                    <td>${cmt.content}</td>
                                                    <td>${cmt.timeCmt}</td>
                                                    <td>${cmt.user}</td>
                                                    <td>
                                                        <button class="btn btn-danger" data-id="${cmt.id}">Xóa</button>
                                                    </td>
                                                </tr>
                                            `;
                                        }
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

    afterRender() {
        let btnRemove;
        if($('.btn-danger').length > 1){
            btnRemove = $('.btn-danger');
        } else {
            btnRemove = [$('.btn-danger')];
        }
        
        btnRemove.forEach(btn => {
            btn.onclick = async () => {
                const idCmt = btn.dataset.id;
                const question = confirm('Bạn có thực sự muốn xóa !');
                if(question) {
                    const cmtRemove = await commentApi.remove(idCmt);
                    if(cmtRemove){
                        resetRender(DetailCmtAdmin, '.list-cmt-detail');
                    }

                }
            }
        })

    }
}


export default DetailCmtAdmin;