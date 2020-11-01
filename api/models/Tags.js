const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tags = new Schema({
    name: String,
    slug: String
});

module.exports = {
    Tags
}, mongoose.model('Tags', Tags)