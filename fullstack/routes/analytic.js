const express = require('express');
const controller = require('../controllers/analytic');
const router = express.Router();

//localhost:6000/api/auth/login
router.get('/overview', controller.overview);

router.get('/analitic', controller.analytic);
module.exports = router;
