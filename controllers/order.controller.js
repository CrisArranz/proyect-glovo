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


    function parseArrayToNumber(parses) {
        return parses.reduce((accumulator, current) => {
            accumulator.push(parseFloat(current));
            console.log(accumulator);
            return accumulator;
        },[]);
    }

    res.locals.hideHeader = true;

    const { idUser, idPayment, address, longitudeOrder, latitudeOrder, product, unitPrice, quantity, productsSelected } = req.body;
    const { idEstablishment } = req.params;

    const parsePrices = parseInt(productsSelected) > 1 ? unitPrice : [unitPrice];
    const parseQuantity = parseInt(productsSelected) > 1 ? quantity : [quantity];

    const order = { 
        idUser, 
        idPayment,
        idEstablishment,
        address, 
        product: parseInt(productsSelected) > 1 ? product : [product], 
        unitPrice: parseArrayToNumber(parsePrices), 
        quantity: parseArrayToNumber(parseQuantity)
    };

    order.products = order.product.reduce((products, product, index) => {
        products.push({ product: product, quantity: parseInt(order.quantity[index]), unitPrice: parseFloat(order.unitPrice[index]), subtotal: parseFloat(order.quantity[index] * order.unitPrice[index])})
        return products;
    }, []);

    order.total = order.products.reduce((total, product) => {
        total += product.subtotal;
        return total;
    }, 0);
    
    order.location = { 
        type: 'Point', 
        coordinates: [longitudeOrder, latitudeOrder] 
    }

    Order
        .create(order)
        .then(() => res.redirect('/'))
        .catch(error => next(error));
}

module.exports.list = (req, res, next) => {
    res.locals.hideHeader = true;

    const { idUser } = req.params;

    Order
        .find({ idUser })
        .populate('idEstablishment')
        .populate('products.product')
        .then(orders => {
            res.render('order/list', { orders })
        })
        .catch(error => next(error))
}

module.exports.detail = (req, res, next) => {
    res.locals.hideHeader = true;

    const { idOrder } = req.params;

    Order
        .findById(idOrder)
        .populate('idEstablishment')
        .populate('products.product')
        .then(orders => {
            res.render('order/detail', { orders })
        })
        .catch(error => next(error))
}