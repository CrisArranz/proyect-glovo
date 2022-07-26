const mongoose = require('mongoose');
const { Establishment, Product } = require('../models');

module.exports.getEstablishments = (req, res, next) => {
    res.locals.hideHeader = true;
    Establishment
        .find()
        .then(establishment => res.render('establishment/list', { establishment }))
        .catch(error => next(error));
}

module.exports.filterEstablishments = (req, res, next) => {
    res.locals.hideHeader = true;
    const { search } = req.query;

    Establishment
      .find({name: new RegExp(search , 'i')})
      .then(establishment => res.render('establishment/list' , { establishment, search }))
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
                    res.render('establishment/detail', { establishment, products })
                })
        })
        .catch(error => next(error));
}


module.exports.doUpdate = (req, res, next) => {
    res.locals.hideHeader = true;

    const establishment = { photo, foodType, address } = req.body;
    const { longitude, latitude } = req.body;

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
    res.render('establishment/new');
}

module.exports.doCreate = (req, res, next) => {

    function renderWithErrors(errors){
        res.locals.hideHeader = true;
        res.status(400).render('establishment/new', { 
            errors, 
            establishment: req.body 
        })
    }
    
    const establishment = { name, photo, foodType, address } = req.body;
    const { longitude, latitude } = req.body;

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