import Slide from './../models/slide';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';

export const list = (req, res) => {
	Slide.find((err, data) => {
        if(err) {
            error: 'Không tìm thấy danh sách sản phẩm'
        }
        res.json({data});
    })
}

// lấy id
export const slideById = (req, res, next, id) => {
	Slide.findById(id).exec((err, slide) => {
        if(err || !slide) {
            res.status(400).json({
                error: 'Không tìm thấy slide'
            })
        }
        // gán product khớp với id vào request
        req.slide = slide;
        next();
    })
}

// thêm slide
export const create = (req, res) => {
	let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
		if(err){
			return res.status(400).json({
				error: "Thêm slide không thành công !"
			})
		}

		// nếu không chọn ảnh thì báo lỗi
		// if(Object.keys(files).length === 0 ){
		// 	return res.status(400).json({
		// 		error: "Bạn cần nhập đủ thông tin !"
		// 	})
		// }
		let slide = new Slide(fields);

		if(files.photo) {
			if(files.photo.size > 500000){
				res.status(400).json({
					error: "Bạn nên upload file ảnh dưới 1mb"
				})
			}
			slide.photo.data = fs.readFileSync(files.photo.path);
			slide.photo.contentType = files.photo.path;
		}

		slide.save((err, data) => {
            if(err) {
                res.status(400).json({
                    error: "Thêm slide không thành công !"
                })
            }
            res.json(data);
        })

	})
}

// ảnh slide
export const photo = (req, res, next) => {
	if(req.slide.photo.data){
        res.set("Content-Type", req.slide.photo.contentType);
        return res.send(req.slide.photo.data)
    }
    next();
}

// sửa slide
export const edit = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
		if(err){
			return res.status(400).json({
				error: "Thêm slide không thành công !"
			})
		}

		let slide = req.slide;
        slide = _.assignIn(slide, fields);

		if(files.photo) {
			if(files.photo.size > 400000){
				res.status(400).json({
					error: "Bạn nên upload file ảnh dưới 1mb"
				})
			}
			slide.photo.data = fs.readFileSync(files.photo.path);
			slide.photo.contentType = files.photo.path;
		}
        
		slide.save((err, data) => {
            if(err) {
                res.status(400).json({
                    error: "Thêm slide không thành công !"
                })
            }
            res.json(data);
        })

	})
}

// xóa slide
export const remove = (req, res) => {
    const slideRemove = req.slide;
    slideRemove.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: "Không xóa được slide"
            })
        }
        // res.redirect('/api/products');
        res.json({
            deletedProduct,
            message: "Đã xóa thành công slide"
        })
    })
}

// chi tiết
export const read = (req, res) => {
    return res.json(req.slide);
}

