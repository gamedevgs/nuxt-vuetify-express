var mongoose = require('mongoose');
const { Tags } = require('./Tags');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Product = new Schema({
    title: { type: String, required: true, index: { unique: true } },
    excerpt: { type: String, required: true },
    thumb: String,
    slug: String,
    content: { type: String, required: true },
    cate: String,
    status: Boolean,
    author: String,
    price: Number,
    sl: Number,
    options: String,
    time_create: Number,
    timme_update: Number,
    tags: [Tags]
});

module.exports = mongoose.model('Product', Product);