const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const productsController = require('../controllers/productsController')

// Get All
router.get('/products', productsController.list)

// Get One
router.get('/products/:id', productsController.show)

// Create
router.post('/products', config.isAuthenticated, productsController.create)

// Update
router.put('/products/:id', config.isAuthenticated, productsController.update)

// Delete
router.delete('/products/:id', config.isAuthenticated, productsController.delete)


module.exports = router
