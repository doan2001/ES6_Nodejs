import Validator from './../../../components/ValidationForm';

import catePostApi from './../../../api/catePostApi';
import postApi from '../../../api/postApi';

import { $ } from './../../../utils';
import storage from './../../../storages/storage';

const AddPost = {
    async render() {
        const { data: catePost } = await catePostApi.getAll();
        
        return /*html*/ `
            <div class="container-fluid mt-4">
                <div class="row row-table">
                    
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between">
                            <h2>Thêm bài viết</h2>
                        </div>

                        <form class="row form-add" method="POST" action="">
                            <div class="col col-lg-6">
                                <div class="group-form">
                                    <label for="exampleInputPassword1" class="form-label">Danh mục</label>
                                    <select class="form-select cate-prd" aria-label="Default select example" name="catePostId">
                                        <option selected value="">-- Chọn danh mục --</option>
                                        ${
                                            catePost.map(cate => {
                                                return /*html*/ `
                                                    <option value="${cate._id}">${cate.name}</option>
                                                `;
                                            }).join('')
                                        }
                                    </select>
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="exampleInputEmail1" class="form-label">Tiêu đề bài viết</label>
                                    <textarea class="form-control header_post" name="header_post" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                                    <span class="err-message"></span>
                                </div>
                                
                                <div class="group-form">
                                    <label for="" class="form-label">Mô tả</label>
                                    <textarea class="form-control des_post" name="des_post" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="form-label">Câu mờ đầu</label>
                                    <textarea class="form-control" name="preamble_post" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                                    <span class="err-message"></span>
                                </div>
                            </div>
                            <div class="col col-lg-6">
                                <div class="group-form">
                                    <label for="" class="form-label">Nội dung chính</label>
                                    <textarea class="form-control content_post" name="content_post" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="exampleInputPassword1" class="form-label">Lời kết</label>
                                    <textarea class="form-control des-prd" name="footer_post" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                                    <span class="err-message"></span>
                                </div>
                                <!--
                                <div class="group-form">
                                    <label for="" class="form-label">Ảnh mô tả</label>
                                    <input type="file" class="form-control photo-prd" id="exampleCheck1" name="photo">
                                    <span class="err-message"></span>
                                </div>
                                -->
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

        const user = storage.getId();
       
        Validator({
            form: '.form-add',
            formGroupSelector: '.group-form',
            errorSelector: '.err-message',
            rules: [
                Validator.isRequired('.cate-prd', 'Vui lòng chọn danh mục bài viết'),
                Validator.isRequired('.header_post', 'Vui lòng nhập tiêu đề bài viết'),
                Validator.isRequired('.des_post', 'Vui lòng nhập mô tả bài viết'),
                Validator.isRequired('.content_post', 'Nhập nội dung bài viết'),
            ],
            onSubmit: async function (post) {
                // formPost.append('photo', post.photo);
                
                if(user){
                    post.userId = user.user._id;
                    // const formPost = new FormData();
                    // formPost.append('catePostId', post.catePostId);
                    // formPost.append('userId', user.user._id);
                    // formPost.append('header_post', post.header_post);
                    // formPost.append('des_post', post.des_post);
                    // formPost.append('preamble_post', post.preamble_post);
                    // formPost.append('content_post', post.content_post);
                    // formPost.append('footer_post', post.footer_post);

                    const {data} = await postApi.add(post);
                    try{
                        if(data){
                            window.location.href='/#/admin_post';
                        }
                    }catch(error){

                    }
                }

            }
            
        
        })

    }
}

export default AddPost;