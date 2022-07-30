const { Order, Establishment, Product } = require('../models');

module.exports.setLocation = (req, res, next) => {
    const { address, latitudeOrder, longitudeOrder, localityOrder } = req.body;
    const objectLocation = { address, latitudeOrder, longitudeOrder, localityOrder };

    res.locals.hideHeader = true;
    res.locals.orderLocation = objectLocation;
    res.cookie('orderLocationCookie', objectLocation, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: true
    })
    return res.redirect('/');
}

module.exports.create = (req, res, next) => {
    res.locals.hideHeader = true;

    Establishment
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
                    res.render('order/new', { establishment, products, location: req.cookies.orderLocationCookie })
                })
        })
        .catch(error => next(error));
}

module.exports.doCreate = (req, res, next) => {
    res.locals.hideHeader = true;

    const { idUser, idPayment, address, longitudeOrder, latitudeOrder, product, unitPrice, quantity, productsSelected } = req.body;

    const order = { 
        idUser, 
        idPayment, 
        address, 
        product: parseInt(productsSelected) > 1 ? product : [product], 
        unitPrice: parseInt(productsSelected) > 1 ? unitPrice : [unitPrice], 
        quantity: parseInt(productsSelected) > 1 ? quantity : [quantity] 
    };

    order.products = order.product.reduce((products, product, index) => {
        products.push({ product: product, quantity: quantity[index], unitPrice: unitPrice[index]})
        return products;
    }, [])
    
    order.location = { 
        type: 'Point', 
        coordinates: [longitudeOrder, latitudeOrder] 
    }

    Order
        .create(order)
        .then(() => res.redirect('/'))
        .catch(error => next(error));
}