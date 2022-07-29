const { Establishment } = require('../models');

module.exports.home = (req, res, next) => {
    res.locals.hideHeader = req.cookies.orderLocationCookie;

    const criterial = {};
    if (req.cookies.orderLocationCookie){
        criterial.location = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [req.cookies.orderLocationCookie.longitudeOrder, req.cookies.orderLocationCookie.latitudeOrder]
                },
                $maxDistance: 5000
            }
        }
    }

    Establishment
        .find(criterial)
        .then((establishments) => res.render('home', { location: req.cookies.orderLocationCookie, establishments }))
        .catch(error => next(error))
}

module.exports.removeLocation = (req, res, next) => {
    if (req.cookies.orderLocationCookie) {
        res.clearCookie('orderLocationCookie');
        res.redirect('/');
    }
}