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
      .find({name: new RegExp(search)})
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
                .then(products => res.render('establishment/detail', { establishment, products }))
        })
        .catch(error => next(error));
}


module.exports.doUpdate = (req, res, next) => {
    res.locals.hideHeader = true;

    const establishment = { photo, types } = req.body;
    establishment.foodType = establishment.types.reduce((types, type) => {
        types[type] = true;
        return types;
    }, {})

    establishment.location = { 
        type: 'Point', 
        coordinates: [req.body.longitude, req.body.latitude] 
    }

    Establishment
        .findByIdAndUpdate(req.params.id, establishment)
        .then(() => {
            res.redirect('/establishment')
        })
        .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('establishment/new');
}

module.exports.doCreate = (req, res, next) => {

    function renderWithErrors(errors){
        res.status(400).render('establishment/create', { 
            errors, 
            establishment: req.body 
        })
    }
    
    const establishment = { name, photo, types } = req.body;
    establishment.foodType = establishment.types.reduce((types, type) => {
        types[type] = true;
        return types;
    }, {})

    establishment.location = { 
        type: 'Point', 
        coordinates: [req.body.longitude, req.body.latitude] 
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