const express = require("express");
const router = express.Router();

const { auth, info, user } = require('../controllers');
const { secure } = require('../middlewares')

router.get('/', (req, res) => {
    res.render('home');
});

//Info
router.get('/work-with-us', info.workWithUs);
router.get('/glovo-partner', info.glovoPartners);
router.get('/deliverer', info.deliverer);
router.get('/glovo-business', info.glovoBusiness);
router.get('/about-us', info.aboutUs);
router.get('/common-questions', info.commonQuestions);
router.get('/blog', info.blog);
router.get('/contact', info.contact);
router.get('/security', info.security);
router.get('/terms', info.terms);
router.get('/privacity', info.privacity);
router.get('/cookies', info.cookies);

//Auth
router.get('/login', auth.login);
router.post('/login', auth.doLogin);

router.get('/register', auth.register);
router.post('/register', auth.doRegister);

//Users details
router.get('/users/:id', secure.isAuthenticated, user.getUser);
router.post('/users/:id/update', secure.isAuthenticated, user.updateUser);

module.exports = router;
