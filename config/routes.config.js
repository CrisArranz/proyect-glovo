const express = require("express");
const router = express.Router();

const { auth, info } = require('../controllers');

router.get('/', (req, res) => {
    res.render('home');
});

//Info
router.get('/work-with-us', info.info);
router.get('/glovo-partners', info.info);
router.get('/deliverer', info.info);
router.get('/glovo-business', info.info);
router.get('/about-us', info.info);
router.get('/common-questions', info.info);
router.get('/blog', info.info);
router.get('/contact', info.info);
router.get('/security', info.info);
router.get('/terms', info.info);
router.get('/privacity', info.info);
router.get('/cookies', info.info);

//Users
router.get('/login', auth.login);
router.post('/login', auth.doLogin);

router.get('/register', auth.register);
router.post('/register', auth.doRegister);

module.exports = router;
