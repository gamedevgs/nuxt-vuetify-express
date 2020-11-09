const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const layoutsController = require('../controllers/layoutsController')

// Get All
router.get('/layouts', layoutsController.list)

// Get One
// router.get('/articles/:id', layoutsController.show)

// Create
router.post('/feature', config.isAuthenticated, layoutsController.create)
router.post('/menu', config.isAuthenticated, layoutsController.createMenu)
    // // Update
    // router.put('/articles/:id', config.isAuthenticated, layoutsController.update)

// // Delete
// router.delete('/articles/:id', config.isAuthenticated, layoutsController.delete)

module.exports = router