import commentApi from '../../../api/commentApi';
import productApi from '../../../api/productApi';

const CommentAdmin = {
    async render (){
        const { data :comments } = await commentApi.getAll();
        const { data : {data: products} } = await productApi.getAll();
        
        const dataCmt = products.map(prd => {
            // lấy ra list cmt trùng với id sp
            const listCmt = comments.filter(cmt => {
                return cmt.prdId == prd._id;
            })
            
            // lấy ra thời gian
            const timeCmt = listCmt.map(cmt => {
                if(cmt.prdId == prd._id){
                    return cmt.createdAt;
                }
            })

            // lấy tên
            const listName = listCmt.map(cmt => {
                if(cmt.prdId == prd._id){
                    return prd.name;
                }
            })

            const cmt = {
                idPrd: prd._id,
                name: listName[0],
                quantity: listName.length,
                timeCmt: timeCmt[0]
            }
            return cmt;
        })

        let index = 0;
        return /*html*/ `
        <div class="container-fluid mt-4">
            <div class="row row-table">
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between">
                        <h2>Danh sách bình luận</h2>
                        
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Thời gian</th>
                                <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    dataCmt.map((cmt, index) => {
                                        if(cmt.name != undefined) {
                                            return /*html*/ `
                                                <tr>
                                                    <td>${index += 1}</td>
                                                    <td>${cmt.name}</td>
                                                    <td>${cmt.quantity}</td>
                                                    <td>${cmt.timeCmt}</td>
                                                    <td>
                                                        <a class="btn btn-primary fs-4" href="/#/admin_detail-cmt/${cmt.idPrd}">Chi tiết</a>
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
    }
}


export default CommentAdmin;