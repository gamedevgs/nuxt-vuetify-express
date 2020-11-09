const inquirer = require("inquirer")
const { SeedAdmin } = require('./controllers/usersController')
const { mongoose } = require('./db')

const _ = require('lodash');
const choseArr = ["Create Admin", "Seed Categoris", "Seed Products", "Seed Articles"]

const Cate = require('./models/Cate');
const Product = require('./models/Product');
const Article = require('./models/Article')
var faker = require('faker/locale/en');
inquirer
    .prompt([{
        name: "getChose",
        type: "list",
        message: "What is your favorite source for info?",
        choices: choseArr,
    }, ])
    .then((answer) => {
        if (answer.getChose === 'Create Admin') {
            CreateAdmin();
        } else if (answer.getChose === 'Seed Categoris') {
            SeedCategoris();
        } else if (answer.getChose === 'Seed Products') {
            SeedProducts();
        } else {
            SeedArticles();
        }
    });

CreateAdmin = () => {
    inquirer
        .prompt([{

            name: "name",
            type: "input",
            message: "full name ?",
        }, {
            name: "email",
            type: "input",
            message: "email ?"
        }, {
            name: "pass",
            type: "input",
            message: "Password ?"
        }])
        .then((answer) => {
            SeedAdmin(answer.name, answer.email, answer.pass)
        });
}
SeedCategoris = () => {
    inquirer
        .prompt([{

            name: "index",
            type: "number",
            message: "Type number need seed Cates?",
        }])
        .then((answer) => {
            _.times(answer.index, () => {
                let name = faker.name.jobTitle();
                let ad = {
                    name: name,
                    parent: 0,
                    slug: ConverToSlug(name),
                    trang_thai: true
                };
                var cate = new Cate(ad)
                    // save record
                cate.save(function(err, cate) {
                    if (err) {
                        console.info('Error when seed:' + err)
                    }
                    console.info('\nCreate Success!:' + cate.name)
                })
            })
        });
}
SeedProducts = () => {
    inquirer
        .prompt([{

            name: "index",
            type: "number",
            message: "Type number need seed Product ?",
        }])
        .then((answer) => {
            _.times(answer.index, () => {
                let ad = {
                    title: faker.name.title(),
                    excerpt: faker.lorem.paragraph(),
                    thumb: faker.image.image(),
                    slug: ConverToSlug(faker.name.title()),
                    content: faker.lorem.paragraphs(),
                    cate: '',
                    status: true,
                    author: faker.name.firstName(),
                    price: faker.commerce.price(),
                    sl: faker.random.number(),
                    options: '',
                    time_create: Date.now(),
                    timme_update: Date.now(),
                    tags: []
                };
                var pro = new Product(ad)
                    // save record
                pro.save(function(err, pro) {
                    if (err) {
                        console.info('Error when seed:' + err)
                    }
                    console.info('\nCreate Success!:' + pro.title)
                })
            })
        });
}
SeedArticles = () => {
    inquirer
        .prompt([{

            name: "index",
            type: "number",
            message: "Type number need seed SeedArticles ?",
        }])
        .then((answer) => {
            _.times(answer.index, () => {
                let ad = {
                    title: faker.name.title(),
                    excerpt: faker.lorem.paragraph(),
                    thumb: faker.image.image(),
                    slug: ConverToSlug(faker.name.title()),
                    content: faker.lorem.paragraphs(),
                    cate: '',
                    status: true,
                    author: faker.name.firstName(),
                    time_create: Date.now(),
                    timme_update: Date.now(),
                    tags: []
                };
                var article = new Article(ad)
                    // save record
                article.save(function(err, article) {
                    if (err) {
                        console.info('Error when seed:' + err)
                    }
                    console.info('\nCreate Success!:' + article.title)
                })
            })
        });
}

ConverToSlug = (str) => {
    if (str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();
        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');
        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');
        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }
}