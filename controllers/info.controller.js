module.exports.workWithUs = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Trabaja con nosotros', location: req.cookies.orderLocationCookie})
}
module.exports.glovoPartners = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Glovo para Partners', location: req.cookies.orderLocationCookie})
}
module.exports.deliverer = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Repartidores', location: req.cookies.orderLocationCookie})
}
module.exports.glovoBusiness = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Glovo Business', location: req.cookies.orderLocationCookie})
}
module.exports.aboutUs = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Acerca de nosotros', location: req.cookies.orderLocationCookie})
}
module.exports.commonQuestions = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Preguntas frecuentes', location: req.cookies.orderLocationCookie})
}
module.exports.blog = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Blog', location: req.cookies.orderLocationCookie})
}
module.exports.contact = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Contacto', location: req.cookies.orderLocationCookie})
}
module.exports.security = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Seguridad', location: req.cookies.orderLocationCookie})
}
module.exports.terms = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Condiciones de Uso', location: req.cookies.orderLocationCookie})
}
module.exports.privacity = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Política de Privacidad', location: req.cookies.orderLocationCookie})
}
module.exports.cookies = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Política de Cookies', location: req.cookies.orderLocationCookie})
}