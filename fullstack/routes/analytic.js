const express = require('express');
const passport = require('passport');

const controller = require('../controllers/analytic');
const router = express.Router();

//localhost:6000/api/auth/login
router.get('/overview', passport.authenticate('jwt', { session: false }), controller.overview);

router.get('/analitic', passport.authenticate('jwt', { session: false }), controller.analytic);
module.exports = router;
