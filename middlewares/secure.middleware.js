module.exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    }else {
        res.redirect('/login')
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    }else {
        res.redirect('/')
    }
}

module.exports.hasLocation = (req, res, next) => {
    if (req.cookies.orderLocationCookie) {
        next();
    }else {
        res.redirect('/')
    }
}