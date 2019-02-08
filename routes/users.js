const express = require('express'),
    router = express.Router(),

    auth = require('../controllers/auth');

//Shows login page
router.get('/login',auth.login);

//Shows register page
router.get('/register',auth.register);

module.exports = router;