const mongoose = require('mongoose');
const { User } = require('../models');

module.exports.getUser = (req, res, next) => {
    res.locals.hideHeader = res.locals.currentUser;
    User
        .findById(req.params.id)
        .then((user) => {
            res.render('user/details', { user })
        })
        .catch(error => next(error))
}

module.exports.updateUser = (req, res, next) => {
    
    function renderWithErrors(errors){
        res.status(400).render('user/details', { 
            errors, 
            user: req.body 
        })
    }
    
    const user = { name, phone } = req.body

    User
        .findByIdAndUpdate(req.params.id, user)
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