import Validator from './../components/ValidationForm'; 
import { $ } from './../utils';
import userApi from './../api/userApi';
// import firebase from '../firebase';

const SignUp = {
    render () {
        window.scrollTo(0,0);
        return /* html */ `
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="box-from">
                            <div class="form-left">
                                <div class="form-left-group">
                                    <h3 class="form-left__title">Tạo tài khoản</h3>
                                    <p class="form-left__des">
                                        Đăng nhập để theo dõi đơn hàng, lưu
                                        danh sách sản phẩm yêu thích, nhận
                                        nhiều ưu đãi hấp dẫn.
                                    </p>
                                </div>
                                <img src="./images/login.png" alt="" class="form-left__img">
                            </div>
                            <form action="" class="form-login" method="POST">
                                <h4 class="title-form">Tạo tài khoản</h4>
                                <div class="group-form">
                                    <label for="" class="title-input">Họ tên: </label>
                                    <input type="text" placeholder="Nhập họ tên" class="txt-input name-input" name="name">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="title-input">SĐT: </label>
                                    <input type="number" placeholder="Nhập số điện thoại" class="txt-input phone-input" name="phone">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="title-input">Email: </label>
                                    <input type="email" placeholder="Nhập email" class="txt-input email-input" name="email">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="title-input">Mật khẩu: </label>
                                    <input type="password" placeholder="Nhập mật khẩu" class="txt-input pwd-input" name="password">
                                    <span class="err-message"></span>
                                </div>
                                
                                <div class="group-form">
                                    <label for="" class="title-input">Hình đại diện: </label>
                                    <input type="file" class="file-input" name="photo">
                                    <span class="err-message"></span>
                                </div>
                                
                                <button class="btn btn-login">Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    `;
    },

    afterRender () {
        const getInfo = async (infoUser) => {
            // const formUser = new FormData();
            // formUser.append('name', infoUser.name);
            // formUser.append('email', infoUser.email);
            // formUser.append('password', infoUser.password);
            // formUser.append('photo', infoUser.photo);
            
            const { data: userSingUp} = await userApi.userSignup(infoUser);

            alert('Đăng kí tài khoản thành công !');
            try{
                if(userSingUp){
                    localStorage.setItem('user', JSON.stringify([userSingUp]));
                    window.location.href = "/#/";
                }
            }catch(error){

            }
        }

        Validator({
            form: '.form-login',
            formGroupSelector: '.group-form',
            errorSelector: '.err-message',
            rules: [
              Validator.isRequired('.name-input', 'Vui lòng nhập họ tên'),
              Validator.isRequired('.phone-input', 'Vui lòng nhập SĐT'),
              Validator.isRequired('.email-input', 'Vui lòng nhập email'),
              Validator.isEmail('.email-input'),
              Validator.isRequired('.pwd-input', 'Vui lòng nhập mật khẩu'),
              Validator.minLength('.pwd-input', 6)
            //   Validator.isRequired('.file-input', 'Bạn chưa chọn ảnh đại diện'),
            ],
            onSubmit: function (user) {
                getInfo(user);
            }
        })
    }
}

export default SignUp;