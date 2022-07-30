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
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "product"
            },
            quantity: Number,
            unitPrice: Number
        }]
    },
    idPayment: {
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