var multer = require('multer')
const dirTree = require("directory-tree");
import path from 'path';
const fs = require('fs');
var fileName = "";
var a = new Date(Date.now());
var year = a.getFullYear();
var month = a.getMonth();
var date = a.getDate();
var setRefix = date.toString() + parseInt(month + 1).toString() + year.toString();

var full_dir = process.env.FOLDER_UPLOAD + '/' + setRefix
console.log(full_dir)
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // check if directory exists
        fs.mkdir(full_dir, { recursive: true }, (err) => { if (err) throw err; })
        cb(null, full_dir)
    },
    filename: function(req, file, cb) {
        var hashname = Date.now() + '_image' + path.extname(file.originalname);
        cb(null, hashname);
        fileName = setRefix + '/' + hashname;
    }
})

var upload = multer({ storage: storage }).any();
module.exports.fileManager = function(req, res) {
    const tree = dirTree(process.env.FOLDER_UPLOAD,{attributes:["size", "type", "extension"]});
    console.log(tree)
    return res.json(tree)
}
module.exports.enterFolder = function(req, res) {
  
    if (req.body.path) {
        const tree = dirTree(req.body.path,{attributes:["size", "type", "extension"]});
        return res.status(200).json({
            message: "success",
            data: tree
        })
    } else {
        return res.status(404).json({
            message: "failer"
        })
    }
}
module.exports.delete = function(req, res) {
    let file = req.body.file
    console.log(file)
    if (fs.existsSync(file)) {
        fs.unlink(file, function(err) {
            if (err) {
                return res.status(404).json({
                    message: err
                });
            } else {
                return res.status(200).json({
                    message: 'success'
                })
            }
        });
    } else {
        return res.status(404).json({
            message: 'File not exits'
        })
    }
}

// Upload 
module.exports.uploadfile = function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.status(404).json({
                message: err
            });
        }
        return res.status(200).json({
            message: 'success',
            link: process.env.BASE_URL + process.env.FOLDER_UPLOAD + '/' + fileName
        });
    })
}
