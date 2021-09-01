import { currentURL, $, resetRender } from './../utils';
import storage from './../storages/storage';
import commentApi from './../api/commentApi';
import userApi from './../api/userApi';

import ProductDetail from './../pages/ProductDetail';

const CommentDetail = {
    async render () {
        let idPrd = currentURL().id;
        const {data : listComment} = await commentApi.getAll();
        const {data : listUser} = await userApi.getAllUser();
        
        const resultCmt = [];

        listComment.forEach(cmt => {
            // lấy user comment
            const userCmt = listUser.filter(user => {
                return user._id == cmt.userId;
            })
   
            const listUserCmt = userCmt.map(user => {
                if(user._id == cmt.userId && cmt.prdId == idPrd){
                    return {
                        // id: cmt.id,
                        name: user.name,
                        content: cmt.content,
                        timeCmt: cmt.createdAt,
                        // avatar: item.file
                    }
                }
            })
            resultCmt.push(...listUserCmt);
        })

        return /*html*/ `
            <div class="box-comment">
                <h3 class="box-comment__title">Đánh giá sản phẩm</h3>
                <div class="form-cmt">
                    <div class="group-cmt">
                        <div class="group-cmt-info">
                            <img src="" alt="" class="group-cmt-info__avatar">
                            <input type="text" placeholder="Bình luận đánh giá về sản phẩm" class="group-cmt-info__value">
                        </div>
                        <div class="group-cmt-action active">
                            <button class="btn btn-cmt-close">Hủy</button>
                            <button class="btn btn-post">Bình luận</button>
                        </div>
                    </div>
                </div>

                ${
                    resultCmt.map(cmt => {
                        if(cmt !== undefined) {
                            return /*html*/ `
                                <div class="cmt-other">
                                    <div class="cmt-avatar">
                                        <img src="" alt="" class="group-cmt-info__avatar">
                                    </div>
                                    <div class="cmt-body">
                                        <div class="cmt-content">
                                            <span class="cmt-content__author">${cmt.name}</span>
                                            <p class="cmt-content__text">${cmt.content}</p>
                                        </div>
                                        <div class="cmt-time">
                                            <span class="cmt-like active">Thích</span>
                                            <span class="cmt-reply">Trả lời</span>
                                            <span class="cmt-time-post">${cmt.timeCmt}</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                    }).join('')
                }

            </div>
        `;
    },

    async afterRender () {
        const inputComment = $('.group-cmt-info__value');
        const btnAction = $('.group-cmt-action');
        const btnPostCmt = $('.btn-post');
        let valueCmt;

        // khi click
        inputComment.onclick = () => {
            btnAction.classList.remove('active');
            btnPostCmt.style.cursor = 'default';
        }
        // khi nhập
        inputComment.oninput = () => {
            valueCmt = inputComment.value.trim();
            if(valueCmt !== '') {
                btnPostCmt.classList.add('active');
                btnPostCmt.style.cursor = 'pointer';
            } else {
                btnPostCmt.classList.remove('active');
            }
        }
        // khi hủy cmt
        if(btnAction) {
            $('.btn-cmt-close').onclick = () => {
                btnAction.classList.add('active');
            }
        }

        // post comment
        let idPrd = currentURL().id;
        const user = storage.getId();
        btnPostCmt.onclick = async () => {
            
            if(user) {
                valueCmt = inputComment.value.trim();
                if(valueCmt !== ''){
                    const comment = {
                        userId: user.user._id,
                        prdId: idPrd,
                        content: valueCmt
                    }
                    const { data } = await commentApi.add(comment);
                    try{
                        if(data){
                            resetRender(CommentDetail, '.box-comment');
                        }
                    }catch(error){

                    }
                }

            } else {
                window.location.href="http://localhost:8080/#/sign-in";
            }
        }
    }
}

export default CommentDetail;