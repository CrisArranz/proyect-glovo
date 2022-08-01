const hbs = require("hbs");
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('isDefined', function (value) {
    return value !== undefined;
});

hbs.registerHelper('inSelection', function (arrayTypes, type) {
    return arrayTypes ? arrayTypes.includes(type) : false;
});

hbs.registerHelper('isSame', function (value, selectValue) {
    return value === selectValue;
});

hbs.registerHelper('isObjectNotEmpty', function (objectNotEmpty) {
    return Object.keys(objectNotEmpty).length;
});

hbs.registerHelper('prettyDateWithTime', (date) => `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);

hbs.registerHelper('showFormattedProducts', (products) => {
    const detailProducts = products.reduce((stringProducts, product, index) => {
        stringProducts += `${(!index ? '' : ',')} ${product.quantity}x ${product.product.name}`;
        return stringProducts;
    }, '');
    return detailProducts.length > 47 ? `${detailProducts.substring(0,45)}...`: detailProducts;
});