const express = require('express') 
const router = express.Router() 
const homeController = require('../controllers/homeController')

router.get('/search', homeController.showSearch)
router.get('/home', homeController.showHome)
router.get('/', homeController.show)

module.exports = router
