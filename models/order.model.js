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
            unitPrice: Number,
            subtotal: Number
        }]
    },
    total: {
        type: Number
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
    },
    idEstablishment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "establishment"
    }
},
{
    timestamps: true
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;