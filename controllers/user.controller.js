const mongoose = require('mongoose');
const { User } = require('../models');

module.exports.getUser = (req, res, next) => {
    res.locals.hideHeader = res.locals.currentUser;
    User
        .findById(req.params.idUser)
        .then((user) => {
            res.render('user/details', { user, location: req.cookies.orderLocationCookie })
        })
        .catch(error => next(error))
}

module.exports.updateUser = (req, res, next) => {
    
    function renderWithErrors(errors){
        res.status(400).render('user/details', { 
            errors, 
            user: req.body, 
            location: req.cookies.orderLocationCookie
        })
    }
    
    const { name, phone } = req.body;
    const user = { name, phone };

    User
        .findByIdAndUpdate(req.params.idUser, user)
        .then(() => {
            res.redirect('/')
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                renderWithErrors(error.errors);
            } else {
                next(error);
            }
        })
}