import Validator from './../../../components/ValidationForm';
import slideApi from './../../../api/slideApi';
import { $ } from './../../../utils';

const AddSlide = {
    async render() {
        
        return /*html*/ `
            <div class="container-fluid mt-4">
                <div class="row row-table">
                    
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between">
                            <h2>Thêm slide</h2>
                        </div>

                        <form class="row form-add" method="POST" action="">
                            <div class="col col-lg-6">
                                <div class="group-form">
                                    <label for="exampleInputEmail1" class="form-label">Ảnh</label>
                                    <input type="file" class="form-control file-slide" id="exampleInputEmail1" name="photo">
                                    <span class="err-message"></span>
                                </div>
                            </div>
                            <div class="col col-lg-6">
                                <div class="group-form">
                                    <label for="exampleInputPassword1" class="form-label">Link liên kết</label>
                                    <textarea class="form-control link-slide" name="pathImage" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                                    <span class="err-message"></span>
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

        Validator({
            form: '.form-add',
            formGroupSelector: '.group-form',
            errorSelector: '.err-message',
            rules: [
                Validator.isRequired('.file-slide', 'Vui lòng chọn ảnh'),
                Validator.isRequired('.link-slide', 'Vui lòng chọn đường dẫn liên kết'),
            ],
            onSubmit: async function (postSlide) {
                
                const slide = new FormData();
                slide.append('photo', postSlide.photo);
                slide.append('pathImage', postSlide.pathImage);
                
                const {data} = await slideApi.add(slide);
                try{
                    if(data){
                        window.location.href='/#/admin_slide';
                    }
                }catch(error){

                }

            }
            
        
        })

    }
}

export default AddSlide;