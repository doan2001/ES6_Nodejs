import Comment from './../models/comment';

// id cmt
export const idCmt = (req, res, next, id) => {
    Comment.findById(id).exec((err, data) => {
        if(err){
            return res.status(400).json({
                err: 'Không tìm thấy cmt'
            })
        }

        req.cmt = data;
        next();
    })
} 


// list bình luận
export const list = async (req, res) => {
    const listCommented = await Comment.find({});
    res.json(listCommented);
}

// tạo bình luận
export const add = (req, res) => {
    const comment = new Comment(req.body);
   
    comment.save((error, cmt) => {
        if(error){
            return res.status(400).json({
                error: "Bình luận không thành công !"
            })
        }
        res.json(cmt);
    })
    
}

//Xóa bình luận
export const remove = (req, res) => {
    const cmtRemove = req.cmt;
    
    cmtRemove.remove((err, data) => {
        if(err){
            return res.status(400).json({
                err: 'Xóa bình luận không thành công !'
            })
        }
        res.json(data);
    })
}