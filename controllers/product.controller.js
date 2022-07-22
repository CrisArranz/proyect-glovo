const mongoose = require('mongoose');
const { Product } = require('../models');

module.exports.create = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('product/new', {idEstablishment: req.params.idEstablishment});
}

module.exports.doCreate = (req, res, next) => {

    function renderWithErrors(errors){
        res.status(400).render(`product/${req.params.id}/create`, { 
            errors, 
            product: req.body 
        })
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
        .then(product => res.render('product/detail', { product }))
        .catch(error => next(error));
}

module.exports.doUpdate = (req, res, next) => {

    function renderWithErrors(errors){
        res.status(400).render(`product/${req.params.idEstablishment}/${req.params.idProduct}/update`, { 
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