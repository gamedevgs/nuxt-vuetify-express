const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const filesController = require('../controllers/fileController')
router.post('/upload', filesController.uploadfile)
router.get('/file-manager', filesController.fileManager)
router.post('/file-delete', filesController.delete)
router.post('/enter-folder', filesController.enterFolder)
module.exports = router
