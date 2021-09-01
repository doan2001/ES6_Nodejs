import Product from './../models/product';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';

// danh sách sản phẩm
export const listProduct = (req, res) => {
    // console.log(req.query);
    // tìm kiếm tất cả dữ liệu có trong db product
    Product.find((err, data) => {
        if(err) {
            error: 'Không tìm thấy danh sách sản phẩm'
        }

        // const page = parseInt(req.query.page) || 1;
        // console.log(page);
        // const limit = 6;

        // const totalPage = Math.ceil(data.length / limit);
        
        // const start = (page - 1) * limit;
        // const end = page * limit;
        
        // const listProduct = data.slice(start, end);
        // console.log(req.query);
        
        res.json({data});
    })

}

// tạo sản phẩm
export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
       
        if(err) {
            return res.status(400).json({
                error: "Thêm sản phẩm không thành công"
            })
        }
        
        // kiểm tra các trường bắt buộc
        const { name, description, price, categoryId  } = fields;
        if(!name || !description || !price || !categoryId){
            return res.status(400).json({ 
                error: "Bạn cần nhập đủ thông tin !"
            })
        }

        let product = new Product(fields);
        
        if(files.photo) {
            // kiểm tra kích thước file
            if(files.photo.size > 300000) {
                res.status(400).json({
                    error: "Bạn nên upload file ảnh dưới 1mb"
                })
            }

            // đọc ghi đường dẫn ảnh
            product.photo.data = fs.readFileSync(files.photo.path);
            // files.photo.path: đường dẫn lưu trữ file
            product.photo.contentType = files.photo.type;
        }

        // lưu vào database
        product.save((err, data) => {
            if(err) {
                res.status(400).json({
                    error: "Không thể thêm được sản phẩm"
                })
            }
            res.json(data);
        }) 

    })

}

// lấy id

export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product) {
            res.status(400).json({
                error: 'Không tìm thấy sản phẩm'
            })
        }
        // gán product khớp với id vào request
        req.product = product;
        next();
    })
}

// chi tiết sản phẩm
export const read = async (req, res) => {
    // req.product nhận được từ productId gán vào
    return res.json(req.product);
}

// sửa sản phẩm
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Sửa sản phẩm không thành công"
            })
        }

        // kiểm tra 
        const { name, description, price } = fields;

        if(!name || !description || !price){
            return res.status(400).json({ 
                error: "Bạn cần nhập đủ thông tin !"
            })
        }

        // _.assignIn: Lặp lại các thuộc tính và kế thừa
        let product = req.product;
        
        product = _.assignIn(product, fields);
        
        if(files.photo) {
            if(files.photo.size > 100000) {
                res.status(400).json({
                    error: "Bạn nên upload file ảnh dưới 1mb"
                })
            }

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        // console.log(product);

        product.save((err, data) => {
            if(err) {
                res.status(400).json({
                    error: "Không thể sửa được sản phẩm"
                })
            }
            res.json(data);
        })
    })

}

// xóa sản phẩm
export const remove = (req, res) => {
    // Nhận được sản phẩm cần xóa từ productId gán vào req.product
    const product = req.product;
    // gọi đến moethod xóa từ mongoose
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: "Không xóa được sản phẩm"
            })
        }
        // res.redirect('/api/products');
        res.json({
            deletedProduct,
            message: "Sản phẩm đã xóa thành công"
        })
    })
}

// export const formAdd = (req, res) => {
//     res.render('product/add_prd');
// }

export const photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}

// search
export const search = async (req, res) => {
    const valueSearch = req.query.q;
    
    const data = await Product.find({})
    
    const resultSearch = data.filter(prd => {
        return prd.name.toLowerCase().indexOf(valueSearch.toLowerCase()) != -1;
    })
    
    if(resultSearch){
        return res.json(resultSearch);
    } else {
        return res.json({
            message: 'Không tìm thấy kết quả tìm kiếm !'
        });
    }
}