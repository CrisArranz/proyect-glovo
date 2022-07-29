const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    address: {
        type: String
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [Number]
    },
    total: {
        type: Number
    },
    products: {
        type: [Object]
    },
    idPayments: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "payment"
    },
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;