const mongoose = require('mongoose');
const { Payment } = require('../models');

module.exports.getPaymentMethods = (req, res, next) => {
    res.locals.hideHeader = true;
    Payment
        .find({ idUser: req.params.idUser })
        .then(payments => res.render('payment/list', { payments, idUser: req.params.idUser }))
        .catch(error => next(error))
}

module.exports.create = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('payment/new', {idUser: req.params.idUser});
}

module.exports.doCreate = (req, res, next) => {
    function renderWithErrors(errors){
        res.locals.hideHeader = true;
        res.status(400).render(`payment/new`, { 
            errors, 
            payment: req.body
        })
    }
    
    const payment = { cardHolder, cardNumber, expirationDate, ccv, country } = req.body;

    payment.idUser = req.params.idUser;

    Payment
      .create(payment)
      .then(() => res.redirect(`/payments/${req.params.idUser}`))
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
            renderWithErrors(error.errors);
        } else {
            next(error);
        }
      });
}

module.exports.doUpdate = (req, res, next) => {
    res.locals.hideHeader = true;

    const activated = { activate } = req.body;

    Payment
        .findOneAndUpdate(activated, { activate: false })
        .then(() => {
            return Payment
                .findByIdAndUpdate(req.params.idPayment, activated)
                .then(() => res.redirect(`/payments/${req.params.idUser}`))
                .catch(error => next(error))
        })
        .catch(error => next(error))
}