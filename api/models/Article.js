const { Tags } = require('./Tags');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Article = new Schema({
    title: { type: String, required: true, index: { unique: true } },
    excerpt: { type: String, required: true },
    thumb: String,
    slug: String,
    content: { type: String, required: true },
    cate: String,
    status: Boolean,
    author: String,
    time_create: Number,
    timme_update: Number,
    tags: [Tags]
});

module.exports = mongoose.model('Article', Article)