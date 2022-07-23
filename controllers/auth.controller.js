const mongoose = require('mongoose');
const { User } = require("../models");

module.exports.register = (req, res, next) => {
    res.locals.hideHeader = true; 
    res.render('auth/register')
}

module.exports.doRegister = (req, res, next) => {

    function renderWithErrors(errors){
        res.status(400).render('auth/register', { 
            errors, 
            user: req.body 
        })
    }

    const { username } = req.body;
    User
        .findOne( { username } )
        .then(user => {
            if (user) {
                renderWithErrors({ username: 'Username already exists' }) 
            } else {
                return User
                    .create(req.body)
                    .then(() => res.redirect('/login')) 
            }
        })
        .catch ((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                renderWithErrors(error.errors);
            } else {
                next(error);
            }
        })
}


module.exports.login = (req, res, next) => {
    res.locals.hideHeader = true;
    res.render('auth/login');
}

module.exports.doLogin = (req, res, next) => {

    function renderInvalidLogin(){
        res.status(400).render('auth/login', {
            errors: { password: 'Username or password invalid' },
            user: req.body
        })
    }

    const { username, password } = req.body;

    User
        .findOne({ username })
        .then((user) => {
            if (!user) {
                renderInvalidLogin();
            } else {
                return user
                    .checkPassword(password)
                    .then(match => {
                        if (match) {
                            req.session.userId = user.id;
                            res.redirect('/');
                        } else {
                            renderInvalidLogin();
                        }
                    });
            }
        })
        .catch(error => next(error));
}

module.exports.logOut = (req, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.redirect('/login');
    }
}