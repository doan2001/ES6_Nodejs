import postApi from './../../../api/postApi';
import userApi from './../../../api/userApi';
import catePostApi from './../../../api/catePostApi';

const PostAdmin = {
    async render () {
        const {data : posts} = await postApi.getAll();
        const {data : users} = await userApi.getAllUser();
        const {data : catePost} = await catePostApi.getAll();

        let listPost = [];
        users.forEach(user => {
            // lấy ra các bài post trùng với cả user post
            const dataPost = posts.filter(post => {
                return user._id == post.userId;
            })
            
            // lấy ra tên người post
            const userPost = dataPost.map(post => {
                if(post.userId == user._id){
                    return {
                        id: post._id,
                        cateName: post.catePostId,
                        userPost: user.name,
                        headerPost: post.header_post,
                        timePost: post.createdAt
                    }   
                }
            })
            listPost.push(...userPost);
        })

        // lấy ra tên danh mục post
        let finalResult = []
        catePost.forEach(cate => {
            const findCateName = listPost.map(post => {
                if(post.cateName == cate._id) {
                    post.cateName = cate.name;
                    return {
                        ...post
                    }
                }
            })
            finalResult.push(...findCateName);
        })
        
        const listUserPost = finalResult.filter(userPost => {
            return userPost != undefined;
        })
        
        let result = listUserPost.length > 1 ? listUserPost : listPost;

        return /*html */ `
            <div class="container-fluid mt-4">
                <div class="row row-table">
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between">
                            <h2>Danh sách bài viết</h2>
                            <a href="/#/admin_post_add" class="btn btn-primary fs-4">Thêm bài viết</a>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Người đăng</th>
                                    <th>Danh mục</th>
                                    <th>Tiêu đề</th>
                                    <th>Thời gian</th>
                                    <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   ${
                                        result.map((post, index) => {
                                            return /*html*/ `
                                                <tr>
                                                    <td>${index + 1}</td>
                                                    <td>${post.userPost}</td>
                                                    <td>${post.cateName}</td>
                                                    <td>${post.headerPost}</td>
                                                    <td>${post.timePost}</td>
                                                    <td>
                                                        <a class="btn btn-primary fs-4" href="">Chi tiết</a>
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
    }
}

export default PostAdmin;