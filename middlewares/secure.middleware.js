const { Payment, Establishment, Product } = require('../models')

module.exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    }else {
        res.redirect('/login')
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    }else {
        res.redirect('/')
    }
}

module.exports.hasLocation = (req, res, next) => {
    if (req.cookies.orderLocationCookie) {
        next();
    }else {
        res.redirect('/')
    }
}


module.exports.hasPayment = (req, res, next) => {
    Payment
        .findOne({idUser: res.locals.currentUser._id})
        .then((payment) => {
            if (payment) {
                next();
            } else {
                return Establishment
                    .findById(req.params.idEstablishment)
                    .then(establishment => {
                        return Product
                            .find({idEstablishment: establishment._id})
                            .then(searchProducts => {
                                const products = searchProducts.reduce((products, product) => {
                                    const { _id, name, photo, price, type, cluster, idEstablishment, keyCluster } = product;
                                    const copyProduct = { _id, name, photo, price, type, cluster, idEstablishment, keyCluster };
                                    const keyProducts = product.cluster.split(' ').join('');
                                    copyProduct['keyCluster'] = keyProducts;
                                    if (products[keyProducts]) {
                                        products[keyProducts].push(copyProduct)
                                    } else {
                                        products[keyProducts] = [copyProduct]
                                    }
                                    return products;
                                }, {})
                                res.locals.hideHeader = true;
                                res.render('order/new', { establishment, products, location: req.cookies.orderLocationCookie, noPayment: true })
                            })
                    })
            }    
        })
        .catch(error => next(error))
}