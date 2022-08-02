const mongoose = require('mongoose');
const { Establishment, Product } = require('../models');

module.exports.getEstablishments = (req, res, next) => {
    res.locals.hideHeader = true;
    Establishment
        .find()
        .then(establishment => res.render('establishment/admin/list', { establishment, location: req.cookies.orderLocationCookie }))
        .catch(error => next(error));
}

module.exports.filterEstablishments = (req, res, next) => {
    res.locals.hideHeader = true;
    const { search } = req.query;

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

    criterial.name = new RegExp(search , 'i');

    Establishment
      .find(criterial)
      .then(establishments => res.render('partials/establishments' , { establishments, search, location: req.cookies.orderLocationCookie }))
      .catch(error => next(error));
}

module.exports.update = (req, res, next) => {
    res.locals.hideHeader = true;

    Establishment
        .findById(req.params.idEstablishment)
        .then(establishment => {
            return Product
                .find({idEstablishment: establishment._id})
                .then(searchProducts => {
                    const products = searchProducts.reduce((products, product) => {
                        const { _id, name, photo, price, type, cluster, idEstablishment, keyCluster } = product;
                        const copyProduct = { _id, name, photo, price, type, cluster, idEstablishment, keyCluster };
                        const keyProducts = product.cluster.split(' ').join('');
                        copyProduct['keyCluster'] = keyProducts;
                        if (products[keyProducts]) {
                            products[keyProducts].push(copyProduct)
                        } else {
                            products[keyProducts] = [copyProduct]
                        }
                        return products;
                    }, {})
                    res.render('establishment/admin/detail', { establishment, products, location: req.cookies.orderLocationCookie })
                })
        })
        .catch(error => next(error));
}


module.exports.doUpdate = (req, res, next) => {
    res.locals.hideHeader = true;
    
   
    const { foodType, address, locality, longitude, latitude } = req.body;

    const establishment = { foodType, address, locality };

    if (req.file) {
        establishment.photo = req.file.path;
    }
    
    establishment.location = { 
        type: 'Point', 
        coordinates: [longitude, latitude] 
    }

    Establishment
        .findByIdAndUpdate(req.params.idEstablishment, establishment)
        .then(() => {
            res.redirect('/establishment')
        })
        .catch(error => next(error));
}

module.exports.doDelete = (req, res, next) => {
    Establishment
      .findByIdAndDelete(req.params.idEstablishment)
      .then(() => {
        return Product
            .deleteMany({idEstablishment: req.params.idEstablishment})
            .then(() => res.redirect(`/establishment`))
      })
      .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('establishment/admin/new', { location: req.cookies.orderLocationCookie });
}

module.exports.doCreate = (req, res, next) => {

    function renderWithErrors(errors){
        res.locals.hideHeader = true;
        res.status(400).render('establishment/admin/new', { 
            errors, 
            establishment: req.body,
            location: req.cookies.orderLocationCookie
        })
    }
    
    const { name, foodType, address, locality, longitude, latitude } = req.body;
    const establishment = { name, foodType, address, locality };

    if (req.file) {
        establishment.photo = req.file.path;
    }
    
    establishment.location = { 
        type: 'Point', 
        coordinates: [longitude, latitude] 
    }

    Establishment
      .create(establishment)
      .then(() => res.redirect('/establishment'))
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
            renderWithErrors(error.errors);
        } else {
            next(error);
        }
      });
}