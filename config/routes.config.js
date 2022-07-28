const express = require("express");
const router = express.Router();
const upload = require('./multer.config');

const { auth, info, user, establishment, product, order, payment, misc } = require('../controllers');
const { secure } = require('../middlewares')

router.get('/', misc.home);

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

//LogOut
router.post('/logout', auth.logOut);

//Users details
router.get('/users/:id', secure.isAuthenticated, user.getUser);
router.post('/users/:id/update', secure.isAuthenticated, user.updateUser);

//Payment Methods
router.get('/payments/:idUser', secure.isAuthenticated, payment.getPaymentMethods);
router.get('/payments/:idUser/create', secure.isAuthenticated, payment.create);
router.post('/payments/:idUser/create', secure.isAuthenticated, payment.doCreate);
router.post('/payments/:idUser/:idPayment/update', secure.isAuthenticated, payment.doUpdate);

//Establishment
router.get('/establishment', secure.isAuthenticated, secure.isAdmin, establishment.getEstablishments);
router.get('/establishment/filter-search', secure.isAuthenticated, secure.isAdmin, establishment.filterEstablishments);
router.get('/establishment/create', secure.isAuthenticated, secure.isAdmin, establishment.create);
router.get('/establishment/:id/update', secure.isAuthenticated, secure.isAdmin, establishment.update);
router.post('/establishment/create', secure.isAuthenticated, secure.isAdmin, upload.single('photo'), establishment.doCreate);
router.post('/establishment/:id/update', secure.isAuthenticated, secure.isAdmin, upload.single('photo'), establishment.doUpdate);
router.post('/establishment/:id/delete', secure.isAuthenticated, secure.isAdmin, establishment.doDelete);

//Product
router.get('/product/:idEstablishment/create', secure.isAuthenticated, secure.isAdmin, product.create);
router.get('/product/:ididEstablishment/:idProduct/update', secure.isAuthenticated, secure.isAdmin, product.update);
router.post('/product/:idEstablishment/create', secure.isAuthenticated, secure.isAdmin, upload.single('photo'), product.doCreate);
router.post('/product/:idEstablishment/:idProduct/update', secure.isAuthenticated, secure.isAdmin, upload.single('photo'), product.doUpdate);
router.post('/product/:idEstablishment/:idProduct/delete', secure.isAuthenticated, secure.isAdmin, product.doDelete);

//Order
router.post('/order/set-location', order.setLocation);

//Remove Location
router.get('/remove-location', misc.removeLocation);



module.exports = router;
