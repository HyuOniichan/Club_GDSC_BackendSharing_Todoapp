const express = require('express') 
const router = express.Router() 

const todoController = require('../controllers/todoController') 

router.put('/:id', todoController.update);
router.delete('/:id', todoController.delete);
router.post('/', todoController.add);
router.get('/', todoController.show) 

module.exports = router
