module.exports.workWithUs = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Trabaja con nosotros'})
}
module.exports.glovoPartners = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Glovo para Partners'})
}
module.exports.deliverer = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Repartidores'})
}
module.exports.glovoBusiness = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Glovo Business'})
}
module.exports.aboutUs = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Acerca de nosotros'})
}
module.exports.commonQuestions = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Preguntas frecuentes'})
}
module.exports.blog = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Blog'})
}
module.exports.contact = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Contacto'})
}
module.exports.security = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Seguridad'})
}
module.exports.terms = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Condiciones de Uso'})
}
module.exports.privacity = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Política de Privacidad'})
}
module.exports.cookies = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('info', {title: 'Política de Cookies'})
}