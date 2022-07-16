const express = require("express");
const router = express.Router();

const { auth } = require('../controllers');

router.get('/', (req, res) => {
    res.render('home');
});

//Users
router.get('/login', auth.login);
router.post('/login', auth.doLogin);

router.get('/register', auth.register);
router.post('/register', auth.doRegister);

module.exports = router;
