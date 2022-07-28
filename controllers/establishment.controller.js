const mongoose = require('mongoose');
const { Establishment, Product } = require('../models');

module.exports.getEstablishments = (req, res, next) => {
    res.locals.hideHeader = true;
    Establishment
        .find()
        .then(establishment => res.render('establishment/list', { establishment, location: req.cookies.orderLocationCookie }))
        .catch(error => next(error));
}

module.exports.filterEstablishments = (req, res, next) => {
    res.locals.hideHeader = true;
    const { search } = req.query;

    Establishment
      .find({name: new RegExp(search , 'i')})
      .then(establishment => res.render('establishment/list' , { establishment, search, location: req.cookies.orderLocationCookie }))
      .catch(error => next(error));
}

module.exports.update = (req, res, next) => {
    res.locals.hideHeader = true;

    Establishment
        .findById(req.params.id)
        .then(establishment => {
            return Product
                .find({idEstablishment: establishment._id})
                .then(searchProducts => {
                    const products = searchProducts.reduce((products, product) => {
                        const copyProduct = { _id, name, photo, price, type, cluster, idEstablishment, keyCluster } = product;
                        const keyProducts = product.cluster.split(' ').join('');
                        copyProduct['keyCluster'] = keyProducts;
                        if (products[keyProducts]) {
                            products[keyProducts].push(copyProduct)
                        } else {
                            products[keyProducts] = [copyProduct]
                        }
                        return products;
                    }, {})
                    res.render('establishment/detail', { establishment, products, location: req.cookies.orderLocationCookie })
                })
        })
        .catch(error => next(error));
}


module.exports.doUpdate = (req, res, next) => {
    res.locals.hideHeader = true;

    const establishment = { foodType, address } = req.body;
    const { longitude, latitude } = req.body;

    establishment.photo = req.file.path;
    establishment.location = { 
        type: 'Point', 
        coordinates: [longitude, latitude] 
    }

    Establishment
        .findByIdAndUpdate(req.params.id, establishment)
        .then(() => {
            res.redirect('/establishment')
        })
        .catch(error => next(error));
}

module.exports.doDelete = (req, res, next) => {
    Establishment
      .findByIdAndDelete(req.params.id)
      .then(() => {
        return Product
            .deleteMany({idEstablishment: req.params.id})
            .then(() => res.redirect(`/establishment`))
      })
      .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('establishment/new', { location: req.cookies.orderLocationCookie });
}

module.exports.doCreate = (req, res, next) => {

    function renderWithErrors(errors){
        res.locals.hideHeader = true;
        res.status(400).render('establishment/new', { 
            errors, 
            establishment: req.body,
            location: req.cookies.orderLocationCookie
        })
    }
    
    const establishment = { name, foodType, address } = req.body;
    const { longitude, latitude } = req.body;

    establishment.photo = req.file.path;
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