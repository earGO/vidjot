const express = require('express'),
    router = express.Router(),
    register = require('../controllers/register'),
    auth = require('../controllers/auth');

//Shows login page
router.get('/login',auth.login);

//Login POST route
router.post('/login',auth.postLogin)

router.get('/logout',auth.logout)

//Shows register page
router.get('/register',register.showRegister);

//register form POST method
router.post('/register',register.register)

module.exports = router;