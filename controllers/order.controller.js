module.exports.setLocation = (req, res, next) => {
    const { address, latitudeOrder, longitudeOrder, localityOrder } = req.body;
    const objectLocation = { address, latitudeOrder, longitudeOrder, localityOrder };

    res.locals.hideHeader = true;
    res.locals.orderLocation = objectLocation;
    res.cookie('orderLocationCookie', objectLocation, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: true
    })
    return res.redirect('/');
}

module.exports.create = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('home', { location: req.cookies.orderLocationCookie });
}