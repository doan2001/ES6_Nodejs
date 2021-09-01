import Post from './../models/post';

export const idPost = (req, res, next, id) => {
    Post.findById(id).exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: 'Không tìm thấy bài viết'
            })
        }
        req.post = data;
        next();
    })
}

export const list = (req, res) => {
    Post.find((error, data) => {
        if(error) {
            return res.status(400).json({
                error: 'Không tìm thấy danh sách thể loại bài đăng'
            })
        }
        res.json(data);
    })
}

export const add = (req, res) => {
    const post = new Post(req.body);
    
    const { catePostId, userId, header_post } = post;

    if(!catePostId, !userId, !header_post) {
        return res.status(400).json({
            error: "Vui lòng điền đầy đủ thông tin !"
        })
    }

    post.save((error, data) => {
        if(error){
            return res.status(400).json({
                error: 'Đăng bài viết không thành công !'
            })
        }
        res.json(data);
    })


}

export const detailPost = (req, res) => {
    return res.json(req.post);
}