const Cate = require('../models/Cate');
const validator = require('express-validator');

// Get all
module.exports.list = function(req, res, next) {
    Cate.find({}, function(err, cate) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting records.'
            });
        }
        return res.json(cate);
    });
}


// Get one
module.exports.show = function(req, res) {
    var id = req.params.id;
    Cate.findOne({ _id: id }, function(err, cate) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting record.'
            });
        }
        if (!cate) {
            return res.status(404).json({
                message: 'No such record'
            });
        }
        return res.json(cate);
    });
}


// Create
module.exports.create = [
    // validations rules
    validator.body('name', 'Chưa nhập tên danh mục').isLength({ min: 1 }),
    validator.body('name').custom(value => {
        return Cate.findOne({ name: value }).then(cate => {
            if (cate !== null) {
                return Promise.reject('Tên danh mục đã được sử dụng');
            }
        })
    }),
    validator.body('slug', 'Hãy nhập slug').isLength({ min: 1 }),

    function(req, res) {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors);
        }
        // initialize record
        var cate = new Cate({
            name: req.body.name,
            slug: req.body.slug,
            parent: req.body.parent,
            trang_thai: req.body.trang_thai
        })

        // save record
        cate.save(function(err, cate) {
            if (err) {
                return res.status(500).json({
                    message: 'Error saving record',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: cate._id
            });
        })
    }
]

// Update
module.exports.update = [
    // validation rules
    validator.body('name', 'Chưa nhập tên danh mục').isLength({ min: 1 }),
    validator.body('name').custom((value, { req }) => {
        return Cate.findOne({ title: value, _id: { $ne: req.params.id } })
            .then(cate => {
                if (cate !== null) {
                    return Promise.reject('Tên danh mục đã được sử dụng');
                }
            })
    }),
    validator.body('slug', 'Hãy nhập slug').isLength({ min: 1 }),

    function(req, res) {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors);
        }

        var id = req.params.id;
        Cate.findById(id, function(err, data) {
            data.name = req.body.name;
            data.slug = req.body.slug;
            data.parent = req.body.parent;
            data.trang_thai = req.body.trang_thai;
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
    Cate.findByIdAndRemove(id, function(err, cate) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting record.'
            });
        }
        return res.json(cate);
    });
}