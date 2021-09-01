import Validator from './../../../components/ValidationForm';
import userApi from './../../../api/userApi';
import { $, currentURL } from './../../../utils';

const EditUser = {
    async render() {
        const userId = currentURL().id;

        const { data: user } = await userApi.get(userId);
      

        return /*html*/ `
            <div class="container-fluid mt-4">
                <div class="row row-table">
                    
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between">
                            <h2>Sửa user <mark>${user.name}</mark></h2>
                        </div>

                        <form class="row form-edit" method="POST" action="">
                            <div class="col col-lg-6">
                                <div class="group-form">
                                    <label for="exampleInputEmail1" class="form-label">Tên</label>
                                    <input type="text" class="form-control name-prd" id="exampleInputEmail1" name="name" value="${user.name}" disabled>
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="exampleInputEmail1" class="form-label">Email</label>
                                    <input type="text" class="form-control name-prd" id="exampleInputEmail1" name="email" value="${user.email}" disabled>
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="exampleInputEmail1" class="form-label">Cấp quyền</label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" id="flexRadioDefault1" ${user.role == 0 ? 'checked' : ''} name="role" value="0">
                                        <label class="form-check-label" for="flexRadioDefault1">
                                        Người dùng
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" id="flexRadioDefault2" ${user.role == 1 ? 'checked' : ''} name="role" value="1">
                                        <label class="form-check-label" for="flexRadioDefault2">
                                        Quản lý
                                        </label>
                                    </div>
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
        const userId = currentURL().id;
        const { data: user } = await userApi.get(userId);

        Validator({
            form: '.form-edit',
            formGroupSelector: '.group-form',
            errorSelector: '.err-message',
            rules: [
                // Validator.isRequired('.price-prd', 'Vui lòng nhập giá'),
                // Validator.isRequired('.des-prd', 'Vui lòng nhập mô tả'),
            ],
            onSubmit: async function (user) {
                user.role = parseInt(user.role);
                const editUser = await userApi.update(user, userId);
                if(editUser){
                    window.location.href='/#/admin_user';
                }
            }
            
        
        })

    }
}

export default EditUser;