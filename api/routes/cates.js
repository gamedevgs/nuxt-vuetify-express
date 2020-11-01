const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const catesController = require('../controllers/catesController')

// Get All
router.get('/cates', catesController.list)

// Get One
router.get('/cates/:id', catesController.show)

// Create
router.post('/cates', config.isAuthenticated, catesController.create)

// Update
router.put('/cates/:id', config.isAuthenticated, catesController.update)

// Delete
router.delete('/cates/:id', config.isAuthenticated, catesController.delete)

module.exports = router
