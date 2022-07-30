const { User, Payment } = require('../models');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const session = expressSession({
    secret: process.env.SESSION_SECRET || 'super secret',
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({ 
        mongoUrl: mongoose.connection._connectionString, 
        ttl: 24 * 60 * 60 
    }),
    cookie: {
        secure: process.env.SESSION_SECURE === 'true',
        httpOnly: true,
    }
})

const loadUser = (req, res, next) => {
    const { userId } = req.session;
    if (userId) {
        User
        .findById(userId) 
        .then(user => {
            req.user = user;
            res.locals.currentUser = user;
            res.locals.admin = user.isAdmin;
            return Payment
                .findOne({ idUser: userId, activate: true })
                .then(payment => {
                    res.locals.idPayment = payment._id;
                    next();
                })
        })
        .catch(next);
    } else {
        next();
    }
}

module.exports = {
    session,
    loadUser
};