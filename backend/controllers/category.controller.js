import formidable from 'formidable';
import fs from 'fs';

import Category from './../models/category';


// list category
export const list = (req, res) => {
	Category.find((err, data) => {
        if(err) {
            error: 'Không tìm thấy danh sách sản phẩm'
        }

        res.json({ data })
    })
}

// add category
export const create = (req, res) => {
	const category = new Category(req.body);
	
	category.save((err, data) => {
		if(err) {
			return res.status(400).json({
				message: "Thêm danh mục thất bại !"
			})
		}
		res.json({ data });
	})
}

//  lấy id category
export const categoryId = (req, res, next, id) => {

	Category.findById(id).exec((err, category) => {
		if(err || !category){
			res.status(400).json({
				error: "Không tìm thấy danh mục"
			})
		}
		req.category = category;
		next();
	})	

}

// chi tiết danh mục
export const read = (req, res) => {
	return res.json(req.category);
}

// sửa danh mục
export const update = (req, res) => {
	// lấy thông tin gửi lên
	const category = req.category;
	category.name = req.body.name;
	
	// lưu vào db
	category.save((err, data) => {
		if(err || !category) {
			res.status(400).json({
				error: "Không tìm thấy danh mục !"
			})
		}

		res.json({ data });
	})
}

// xóa danh mục sản phẩm
export const remove = (req, res) => {
	const category = req.category;
	
	category.remove((err, deleteCate) => {
		if(err || !category){
			res.status(400).json({
				error: "Xóa sản phẩm không thành công !"
			})
		}
		res.json({
			deleteCate,
			message: "Xóa thành công danh mục !"
		})
	})
}

// user id
export const userId = (req, res, next, id) => {
	// console.log(req.body);
	req.category = req.body;
}