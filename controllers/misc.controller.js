module.exports.home = (req, res) => {
    res.locals.hideHeader = req.cookies.orderLocationCookie;
    res.render('home', { location: req.cookies.orderLocationCookie });
}

module.exports.removeLocation = (req, res, next) => {
    if (req.cookies.orderLocationCookie) {
        res.clearCookie('orderLocationCookie');
        res.redirect('/');
    }
}