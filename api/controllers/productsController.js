const Products = require('../models/Product');
const validator = require('express-validator');
import { ConverToSlug } from "../../helpers/FuncHelper";

// Get all
module.exports.list = function(req, res, next) {
    Products.find({}, function(err, products) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting records.'
            });
        }
        return res.json(products);
    });
}


// Get one
module.exports.show = function(req, res) {
    var id = req.params.id;
    Products.findOne({ _id: id }, function(err, products) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting record.'
            });
        }
        if (!products) {
            return res.status(404).json({
                message: 'No such record'
            });
        }
        return res.json(products);
    });
}


// Create
module.exports.create = [
    // validations rules
    validator.body('title', 'Hãy nhập tiêu đề bài viết').isLength({ min: 1 }),
    validator.body('title').custom(value => {
        return Products.findOne({ title: value }).then(product => {
            if (product !== null) {
                return Promise.reject('Tiêu đề bài viét đã sử dụng');
            }
        })
    }),
    validator.body('excerpt', 'Chưa nhập chú thích').isLength({ min: 1 }),
    validator.body('thumb', 'Chưa chọn hình đại diện').isLength({ min: 1 }),
    validator.body('content', 'Hãy Nhập Nội dung').isLength({ min: 1 }),
    validator.body('cate', 'Hãy chọn Danh mục').isLength({ min: 1 }),
    validator.body('price', 'Hãy nhập giá').isLength({ min: 1 }),
    validator.body('sl', 'Hãy nhập Số lượng tồn kho').isLength({ min: 1 }),
    function(req, res) {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors);
        }
        let obj = {};
        let arr_Tags = [];
        if (req.body.tags.length != 0) {
            let res_tags = JSON.parse(req.body.tags);
            res_tags.map((v, k) => {
                arr_Tags.push({
                    name: v,
                    slug: ConverToSlug(v)
                })
            })
        }
        var products = new Products({
            title: req.body.title,
            excerpt: req.body.excerpt,
            thumb: req.body.thumb,
            slug: ConverToSlug(req.body.title),
            content: req.body.content,
            cate: req.body.cate,
            status: req.body.status,
            author: req.body.author,
            sl: req.body.sl,
            price: req.body.price,
            options: req.body.options,
            time_create: Date.now(),
            timme_update: Date.now(),
            tags: arr_Tags
        })

        // save record
        products.save(function(err, product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error saving record',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: product._id
            });
        })
    }
]

// Update
module.exports.update = [
    // validation rules
    validator.body('title', 'Hãy nhập tiêu đề bài viết').isLength({ min: 1 }),
    validator.body('title').custom((value, { req }) => {
        return Products.findOne({ title: value, _id: { $ne: req.params.id } })
            .then(product => {
                if (product !== null) {
                    return Promise.reject('Tiêu đề bài viét đã sử dụng');
                }
            })
    }),
    validator.body('excerpt', 'Chưa nhập chú thích').isLength({ min: 1 }),
    validator.body('thumb', 'Chưa chọn hình đại diện').isLength({ min: 1 }),
    validator.body('content', 'Hãy Nhập Nội dung').isLength({ min: 1 }),
    validator.body('cate', 'Hãy chọn Danh mục').isLength({ min: 1 }),
    validator.body('price', 'Hãy nhập giá').isLength({ min: 1 }),
    validator.body('sl', 'Hãy nhập Số lượng tồn kho').isLength({ min: 1 }),
    function(req, res) {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors);
        }
        var id = req.params.id;
        let arr_Tags = [];
        if (req.body.tags.length != 0) {
            let res_tags = JSON.parse(req.body.tags);
            res_tags.map((v, k) => {
                arr_Tags.push({
                    name: v,
                    slug: ConverToSlug(v)
                })
            })
        }
        Products.findById(id, function(err, data) {
            data.title = req.body.title;
            data.excerpt = req.body.excerpt;
            data.slug = ConverToSlug(req.body.title);
            data.content = req.body.content;
            data.thumb = req.body.thumb;
            data.cate = req.body.cate;
            data.status = req.body.status;
            data.author = req.body.author;
            data.price = req.body.price;
            data.sl = req.body.sl;
            data.options = req.body.options;
            data.time_create = data.time_create;
            data.timme_update = Date.now();
            data.tags = arr_Tags
            data.save();
            if (!data) {
                return res.status(404).json({
                    message: 'No such record'
                });
            }
            if (err) {
                return res.status(500).json({
                    message: 'Error getting record.'
                });
            }
            return res.json(data);
        });
    }

]


// Delete
module.exports.delete = function(req, res) {
    var id = req.params.id;
    Products.findByIdAndRemove(id, function(err, product) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting record.'
            });
        }
        return res.json(product);
    });
}