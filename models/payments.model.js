const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CARD_NUMBER_PATTERN = /^[0-9]{16}|(([0-9]{4}\s){3}[0-9]{3,4})$/;
const CCV_PATTERN = /^[0-9]{3}$/;

const paymentSchema = new Schema({
    cardHolder: {
        type: String,
        required: 'The name is required'
    },
    cardNumber: {
        type: String,
        required: 'User email is required',
        match: [CARD_NUMBER_PATTERN, 'Invalid card number']
    },
    expirationDate: {
        type: String,
        required: 'The expiration Date is required'
    },
    ccv: {
        type: String,
        required: 'CCV is required',
        match: [CCV_PATTERN, 'The password need at least 3 chars']
    },
    country:{
        type: String
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