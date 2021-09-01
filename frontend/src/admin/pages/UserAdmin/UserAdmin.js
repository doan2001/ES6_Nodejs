import slideApi from './../../../api/slideApi';
import userApi from './../../../api/userApi';
import { $, resetRender} from './../../../utils';
const UserAdmin = {
    async render () {
        const {data : dataUser} = await userApi.getAll();
        

        return /*html */ `
            <div class="container-fluid mt-4 list-user">
                <div class="row row-table">
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <h2>Danh sách tài khoản</h2>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên</th>
                                        <th>Email</th>
                                        <th>Chức vụ</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${
                                        dataUser.map((user, index) => {
                                            let rank;
                                            switch(user.role){
                                                case 0:
                                                    rank = 'Người dùng'
                                                    break;
                                                case 1: 
                                                    rank = 'Quản lý';
                                                    break;
                                            }
                                            return /*html*/ `
                                                <tr>
                                                    <td>${index + 1}</td>
                                                    <td>${user.name}</td>
                                                    <td>${user.email}</td>
                                                    <td>${rank}</td>
                                                    <td>
                                                        <a href="/#/admin_user_edit/${user._id}" class="btn btn-primary fs-4">Sửa</a>
                                                        <button class="btn btn-danger fs-4" data-id="${user._id}">Xóa</button>
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
                        const removeUser = await userApi.remove(id);
                        if(removeUser){
                            resetRender(UserAdmin, '.list-user');    
                        }
                        
                    }
                }
            })
        }

    }
}

export default UserAdmin;