const { Layout, Menu, Feature } = require('../models/Layouts');
const validator = require('express-validator');

const list = async(req, res, next) => {
    const feature = await Layout.find({})
    return res.status(200).json({ layouts: feature })
}
const create = async(req, res, next) => {
    var list = await Layout.find({})
    var listFe = JSON.parse(req.body.feature);
    if (list.length == 0) {
        let feature = new Layout({ feature: listFe })
        await feature.save()
        return res.status(201).json({
            feature
        })
    } else {
        console.log(list)
        console.log(list[0]._id)
        await Layout.findByIdAndUpdate(list[0]._id, { feature: listFe })
        return res.status(200).json({ sucess: true })
    }
}
const createMenu = async(req, res, next) => {
    var list = await Layout.find({})
    var list_menu = JSON.parse(req.body.menu);
    if (list.length == 0) {
        let menus = new Layout({ menu: list_menu })
        await menus.save()
        return res.status(201).json({
            menus
        })
    } else {
        await Layout.findByIdAndUpdate(list[0]._id, { menu: list_menu })
        return res.status(200).json({ sucess: true })
    }
}
const getCateByid = async(req, res, next) => {
    validator.body('cateId', 'Chưa nhập chú thích').isNumeric()
        // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const { cateId } = req.params
    const cates = await Cate.findById(cateId)
    return res.status(200).json({ cates })
}
const replaceCate = async(req, res, next) => {
    const { cateId } = req.params
    const newCate = req.body
    const cates = await Cate.findByIdAndUpdate(cateId, newCate)
    return res.status(200).json({ sucess: true })
}
const updateCate = async(req, res, next) => {
    const { cateId } = req.params
    const newCate = req.body
    const cates = await Cate.findByIdAndUpdate(cateId, newCate)
    return res.status(200).json({ sucess: true })
}
const getArticleByCatId = async(req, res, next) => {
    const { cateId } = req.params
        // Get cate
    const cate = await Cate.findById(cateId).populate('article')

    return res.status(200).json({ article: cate.article })
}
const newArticleByCatId = async(req, res, next) => {
    const { cateId } = req.params

    // Create a new article
    const newArticles = new Article(req.body)

    // Get cate
    const cates = await Cate.findById(cateId)

    // Assign cate as a Article's cate
    newArticles.cate = cates

    // Save the article
    await newArticles.save()

    // Add article to cates's a article 'article'
    cates.article.push(newArticles._id)

    // Save the cates
    await cates.save()

    res.status(201).json({ article: newArticles })
}
module.exports = {
    list,
    create,
    createMenu,
    getCateByid,
    replaceCate,
    updateCate,
    getArticleByCatId,
    newArticleByCatId
}