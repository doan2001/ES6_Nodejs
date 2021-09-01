import postApi from './../api/postApi';
import catePostApi from './../api/catePostApi';
import { $,resetRender } from './../utils';
import PostPage from './../pages/PostPage';
import storage from './../storages/storage';

const SideBarPost = {
    async render () {
        // const { data : posts } = await postsApi.getAll();
        const { data : catePost } = await catePostApi.getAll();
        
        return /*html*/ `
            <div class="post-let">
                <div class="sidebar-post">
                    <button class="btn btn-create-post">Đăng bài viết</button>

                    <span class="hashtag">
                        <i class="icon-hashtag fas fa-hashtag"></i>
                        Thẻ
                    </span>

                    <!-- list cate-post -->
                    <ul class="list-hashtag">
                        <li class="item-hashtag">
                            <a href="/#/posts" class="cate-hashtag">
                                <span class="icon-tag"></span> 
                                Tất cả
                            </a>
                            ${
                                catePost.map(cate => {
                                    return /*html*/ `
                                        <a href="/#/posts/${cate._id}" class="cate-hashtag">
                                            <span class="icon-tag"></span> 
                                            ${cate.name}
                                        </a>
                                    `;
                                }).join("")
                            }
                        </li>
                    </ul>
                </div>

                <!-- toast post -->
                <div class="model-post">
                    <div class="box-post">
                        <div class="top-post">
                            <h3 class="note-post">Tạo bài viết</h3>
                        </div>

                        <div class="close-post">
                            <i class="fas fa-times"></i>
                        </div>

                        <div class="box-body-post">
                            <div class="person-post">
                                <img src="./images/fire.png" alt="" class="person-post__img">
                                <div class="model-option">
                                    <span class="person-name">son son</span>
                                    <select name="idCatePost" id="" class="list-cate-post">
                                         ${
                                            catePost.map(cate => {
                                                return /*html*/ `
                                                    <option value="${cate._id}">${cate.name}</option>
                                                `;
                                            }).join("")
                                        }
                                    </select>
                                </div>
                            </div>
                            <div class="group-title">
                                <label for="" class="name-post">Tiêu đề: </label>
                                <input type="text" class="txt-post" name="header_post">
                            </div>
                            <div class="frame-post">
                                <textarea name="content_post" id="" cols="30" rows="10" class="text-post" placeholder="Nội dung bài viết ?"></textarea>
                            </div>
                        </div>
                        
                        <div class="editor">
                            <span class="note-editor">Thêm vào bài viết</span>
                            <ul class="list-editor">
                                <li class="item-editor">
                                    <input type="file" class="open-file" id="open-file" name="image_post">
                                    <label for="open-file" class="file-image">
                                        <i class="icon-file fas fa-image"></i>
                                    </label>
                                </li>
                                <li class="item-editor">
                                    <i class="icon-tags fas fa-tags"></i>
                                </li>
                                <li class="item-editor">
                                    <i class="icon-map fas fa-map-marker-alt"></i>
                                </li>
                                <li class="item-editor">
                                    <i class="icon-laugh far fa-laugh"></i>
                                </li>
                                <li class="item-editor">
                                    <i class="icon-dot fas fa-ellipsis-h"></i>
                                </li>
                            </ul>
                        </div>

                        <button class="btn btn-get-out">Đăng bài</button>
                    </div>
                </div>
            </div>    
        `;
    },

    async afterRender () {
        // handle model post
        const btnCreatPost = $('.btn-create-post');
        const modelPost = $('.model-post');
  
        btnCreatPost.onclick = () => {
            modelPost.classList.add('active-model');
        }
       
        $('.close-post').onclick = () => {
            modelPost.classList.remove('active-model');
        }
        window.onclick = (e) => {
            if(e.target == modelPost) {
                modelPost.classList.remove('active-model');
            }
        }

        // add post
        const catePost = $('.list-cate-post');
        const titlePost = $('.txt-post');
        const contentPost = $('.text-post');
        const imgPost = $('.open-file');
        const btnPost = $('.btn-get-out');

        const userPost = storage.getId();

        // sử lý khi nhập ( event )
        titlePost.oninput = () => {
            if(titlePost.value !== ''){
               btnPost.classList.add('active');
            } else {
                btnPost.classList.remove('active');
            }
        }

        // add post
        btnPost.onclick = async () => {
            if(userPost) {
                if(titlePost.value !== '' && contentPost.value !== '') {
                    const post = {
                        catePostId: catePost.value,
                        userId: userPost.user._id,
                        header_post: titlePost.value,
                        content_post: contentPost.value,
                    }
                    
                    const {data: upPost} = await postApi.add(post);
                    if(upPost){
                        modelPost.classList.remove('active-model');
                        resetRender(PostPage, '.post-page');
                    }
                }
            } else {
                window.location.href="/#/sign-in";
            }
        }


    }
}

export default SideBarPost;