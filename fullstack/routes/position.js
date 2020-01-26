const express = require('express');
const controller = require('../controllers/position');
const router = express.Router();

//localhost:6000/api/auth/login
router.get('/:categoryId', controller.getCategoryById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;