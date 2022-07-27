const mongoose = require('mongoose');
const { Establishment, Product } = require('../models');

module.exports.create = (req, res, next) => {
    res.locals.hideHeader = true;
    Establishment
        .findById(req.params.idEstablishment)
        .then(establishment => {
            res.render('product/new', { establishment })
        })
        .catch(error => next(error))
}

module.exports.doCreate = (req, res, next) => {

    function renderWithErrors(errors){
        Establishment
            .findById(req.params.idEstablishment)
            .then(establishment => {
                res.status(400).render(`product/new`, { 
                    errors, 
                    product: req.body,
                    establishment
                })
            })
        .catch(error => next(error))
    }
    
    const product = { name, photo, lastPrice } = req.body;

    product.price = parseFloat(product.lastPrice);
    product.idEstablishment = req.params.idEstablishment;

    Product
      .create(product)
      .then(() => res.redirect(`/establishment/${req.params.idEstablishment}/update`))
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
            renderWithErrors(error.errors);
        } else {
            next(error);
        }
      });
}

module.exports.update = (req, res, next) => {
    res.locals.hideHeader = true;

    Product
        .findById(req.params.idProduct)
        .populate('idEstablishment')
        .then(product => res.render('product/detail', { product }))
        .catch(error => next(error));
}

module.exports.doUpdate = (req, res, next) => {

    function renderWithErrors(errors){
        res.locals.hideHeader = true;
        res.status(400).render(`product/detail`, { 
            errors, 
            product: req.body 
        })
    }
    
    const product = { photo, lastPrice } = req.body;

    product.price = parseFloat(product.lastPrice);
    product.idEstablishment = req.params.idEstablishment;

    Product
      .findByIdAndUpdate(req.params.idProduct, product)
      .then(() => res.redirect(`/establishment/${req.params.idEstablishment}/update`))
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
            renderWithErrors(error.errors);
        } else {
            next(error);
        }
      });
}

module.exports.doDelete = (req, res, next) => {
    Product
      .findByIdAndDelete(req.params.idProduct)
      .then(() => res.redirect(`/establishment/${req.params.idEstablishment}/update`))
      .catch(error => next(error));
}