import { json } from 'body-parser';
import catePost from './../models/catePost';

export const catePostId = (req, res, next, id) => {
    catePost.findById(id).exec((err, cate) => {
		if(err || !cate){
			res.status(400).json({
				error: "Không tìm thấy danh mục"
			})
		}
		req.catePost = cate;
        // nó se chuyển đến cái phần router đang gọi
		next();
	})
}

export const list = (req, res) => {
    catePost.find((error, data) => {
        if(error) {
            return res.status(400).json({
                error: 'Không tìm thấy danh sách danh mục bài viết'
            })
        }
        res.json(data);
    })
}

export const read = (req, res) => {
    return res.json(req.catePost);
}

export const add = (req, res) => {
    const cate_post = new catePost(req.body);
   
    cate_post.save((error, data) => {
        if(error){
            return res.status(400).json({
                error: 'Them danh mục bài viết không thành công !'
            })
        }
        res.json(data);
    })
}

export const edit = (req, res) => {
    const newCatePost = req.catePost;
    newCatePost.name = req.body.name;
    
    newCatePost.save((error, newData) => {
        if(error){
            return res.status(400).json({
                error: "Sửa danh mục bài viết không thành công !"
            })
        }
        res.json(newData);
    })
}

export const remove = (req, res) => {
    const catePost = req.catePost;
    catePost.remove((error, catePostDelete) => {
        if(error){
            return res.status(400).json({
                error: 'Xóa danh mục bài viết không thành công !'
            })
        }
        res.json({
            catePostDelete,
            message: "Xóa thành công danh mục bài viết !"
        })
    })
}