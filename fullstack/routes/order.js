const express = require('express');
const controller = require('../controllers/order');
const router = express.Router();

//localhost:6000/api/auth/login
router.get('/', controller.getAll);

router.post('/', controller.create);
module.exports = router;
