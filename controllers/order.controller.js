module.exports.setLocation = (req, res, next) => {
    const objectLocation = { address, latitude, longitude } = req.body
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