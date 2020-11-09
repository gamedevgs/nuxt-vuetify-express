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

var dir = path.dirname(new URL(
    import.meta.url).pathname);
var dirUpload = dir.replace(/(\/api\/controllers)/gm, `/static`);
var full_dir = dirUpload + process.env.FOLDER_UPLOAD + '/' + setRefix
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(req.files)
        console.log(file)
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
    const tree = dirTree(dirUpload);
    return res.json(tree)
}
module.exports.enterFolder = function(req, res) {
    console.log(req.body.path)
    if (req.body.path) {
        const tree = dirTree(req.body.path);
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
                message: 'Error file upload'
            });
        }
        return res.status(200).json({
            message: 'success',
            link: process.env.BASE_URL + process.env.FOLDER_UPLOAD + '/' + fileName
        });
    })
}