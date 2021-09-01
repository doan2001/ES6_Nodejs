import Validator from './../components/ValidationForm'; 
import { $ } from './../utils';
import userApi from './../api/userApi';
import orderApi from './../api/orderApi';


const SignIn = {
    async render () {
        window.scrollTo(0,0);
        return /* html */ `
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="box-from">
                            <div class="form-left">
                                <div class="form-left-group">
                                    <h3 class="form-left__title">Đăng nhập</h3>
                                    <p class="form-left__des">
                                        Đăng nhập để theo dõi đơn hàng, lưu
                                        danh sách sản phẩm yêu thích, nhận
                                        nhiều ưu đãi hấp dẫn.
                                    </p>
                                </div>
                                <img src="./images/login.png" alt="" class="form-left__img">
                            </div>
                            <form class="form-login" method="POST">
                                <h4 class="title-form">Đăng nhập</h4>
                                <div class="group-form">
                                    <label for="" class="title-input">Tài khoản: </label>
                                    <input type="text" placeholder="Email/Số điện thoại" class="txt-input acc-input" name="email">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="title-input">Mật khẩu: </label>
                                    <input type="password" placeholder="Mật khẩu" class="txt-input pwd-input" name="password">
                                    <span class="err-message"></span>
                                    <span class="err-server"></span>
                                </div>
                                <button class="btn btn-login">Sign in</button>
                                <div class="group-action">
                                    <a href="/#/sign-up" class="sign-up">Đăng kí tài khoản ?</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender () {


        Validator({
            form: '.form-login',
            formGroupSelector: '.group-form',
            errorSelector: '.err-message',
            rules: [
              Validator.isRequired('.acc-input'),
              Validator.isRequired('.pwd-input'),
            ],
            onSubmit: async function (userLogin) {
                
                try{
                    const { data } = await userApi.userLogin(userLogin);
                    if(data){
                        window.localStorage.setItem('user', JSON.stringify([data]));
                        window.location.href = "/#/";
                    }
                }catch(error){
                    $('.err-server').innerHTML = error.response.data.error;
                }
            }
        })
    }
}

export default SignIn;