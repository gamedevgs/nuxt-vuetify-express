var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const MenuSchema = new Schema({
    name: String,
    link: String,
    status: Boolean
});
const Menu = mongoose.model('Menu', MenuSchema)
const FeatueSchema = new Schema({
    feature: [],
});
const Feature = mongoose.model('Feature', FeatueSchema)
var LayoutSchema = new Schema({
    feature: [],
    menu: []
});
const Layout = mongoose.model('Layout', LayoutSchema)
module.exports = { Menu, Layout, Feature }