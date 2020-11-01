const Article = require('../models/Article');
const validator = require('express-validator');
import { ConverToSlug } from "../../helpers/FuncHelper";
// Get all
module.exports.list = function(req, res, next) {
    Article.find({}, function(err, articles) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting records.'
            });
        }
        return res.json(articles);
    });
}


// Get one
module.exports.show = function(req, res) {
    var id = req.params.id;
    Article.findOne({ _id: id }, function(err, article) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting record.'
            });
        }
        if (!article) {
            return res.status(404).json({
                message: 'No such record'
            });
        }
        return res.json(article);
    });
}


// Create
module.exports.create = [
    // validations rules
    validator.body('title', 'Hãy nhập tiêu đề bài viết').isLength({ min: 1 }),
    validator.body('title').custom(value => {
        return Article.findOne({ title: value }).then(article => {
            if (article !== null) {
                return Promise.reject('Tiêu đề bài viét đã sử dụng');
            }
        })
    }),
    validator.body('excerpt', 'Chưa nhập chú thích').isLength({ min: 1 }),
    validator.body('thumb', 'Chưa chọn hình đại diện').isLength({ min: 1 }),
    validator.body('content', 'Hãy Nhập Nội dung').isLength({ min: 1 }),
    validator.body('cate', 'Hãy chọn Danh mục').isLength({ min: 1 }),
    function(req, res) {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors);
        }
        // title: { type: String, required: true, index: { unique: true } },
        // excerpt: { type: String, required: true },
        // thumb:String,
        // slug:String,
        // content: { type: String, required: true },
        // cate:String,
        // status:Boolean,
        // author:String,
        // time_create:Number,
        // timme_update:Number,
        // tags:String
        // initialize record
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
        var article = new Article({
            title: req.body.title,
            excerpt: req.body.excerpt,
            thumb: req.body.thumb,
            slug: ConverToSlug(req.body.title),
            content: req.body.content,
            cate: req.body.cate,
            status: req.body.status,
            author: req.body.author,
            time_create: Date.now(),
            timme_update: Date.now(),
            tags: arr_Tags
        })

        // save record
        article.save(function(err, article) {
            console.log(article)
            if (err) {
                return res.status(500).json({
                    message: 'Error saving record',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: article._id
            });
        })
    }
]

// Update
module.exports.update = [
    // validation rules
    validator.body('title', 'Hãy nhập tiêu đề bài viết').isLength({ min: 1 }),
    validator.body('title').custom((value, { req }) => {
        return Article.findOne({ title: value, _id: { $ne: req.params.id } })
            .then(article => {
                if (article !== null) {
                    return Promise.reject('Tiêu đề bài viét đã sử dụng');
                }
            })
    }),
    validator.body('excerpt', 'Chưa nhập chú thích').isLength({ min: 1 }),
    validator.body('thumb', 'Chưa chọn hình đại diện').isLength({ min: 1 }),
    validator.body('content', 'Hãy Nhập Nội dung').isLength({ min: 1 }),
    validator.body('cate', 'Hãy chọn Danh mục').isLength({ min: 1 }),
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
        Article.findById(id, function(err, data) {
            data.title = req.body.title;
            data.excerpt = req.body.excerpt;
            data.slug = ConverToSlug(req.body.title);
            data.content = req.body.content;
            data.thumb = req.body.thumb;
            data.cate = req.body.cate;
            data.status = req.body.status;
            data.author = req.body.author;
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
    Article.findByIdAndRemove(id, function(err, article) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting record.'
            });
        }
        return res.json(article);
    });
}