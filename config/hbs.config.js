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