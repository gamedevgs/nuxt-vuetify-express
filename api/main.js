const express = require('express')
const { dbBackupTask } = require('./db')
const logger = require('morgan')
    // Create express instnace
const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Init body-parser options (inbuilt with express)
app.use(logger('dev'))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Require & Import API routes
const users = require('./routes/users')
const articles = require('./routes/articles')
const products = require('./routes/products')
const cates = require('./routes/cates')
const files = require('./routes/files')

app.use(users)
app.use(articles)
app.use(products)
app.use(cates)
app.use(files)

// Export the server middleware
module.exports = {
    path: '/api',
    handler: app
}