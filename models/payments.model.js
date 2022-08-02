const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CARD_NUMBER_PATTERN = /^[0-9]{16}|(([0-9]{4}\s){3}[0-9]{3,4})$/;
const CCV_PATTERN = /^[0-9]{3}$/;
const EXPIRATION_DATE_PATTERN = /^[0-9]{2}\W[0-9]{2}$/;

const paymentSchema = new Schema({
    cardHolder: {
        type: String,
        required: 'Car Holder is required',
        trim: true
    },
    cardNumber: {
        type: String,
        required: 'Car number is required',
        match: [CARD_NUMBER_PATTERN, 'Invalid card number'],
        trim: true
    },
    expirationDate: {
        type: String,
        required: 'The expiration Date is required',
        match: [EXPIRATION_DATE_PATTERN, 'Invalid Expiration date, correct format MM/YY'],
        trim: true
    },
    ccv: {
        type: String,
        required: 'CCV is required',
        match: [CCV_PATTERN, 'CCV only need 3 chars'],
        trim: true
    },
    country:{
        type: String,
        trim: true
    },
    activate:{
        type: Boolean,
        default: false
    },
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }
});

const Payment = mongoose.model('payment', paymentSchema)

module.exports = Payment;