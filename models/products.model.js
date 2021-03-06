const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String
    },
    photo: {
        type: String,
        default: '/image/image-not-found.svg',
        validate: {
            validator: function(image){
                try {
                    new URL(image);
                    return true;
                } catch(error){
                    return false;
                }
            },
        }
    },
    price: {
        type: Number
    },
    type: {
        type: String
    },
    cluster: {
        type: String
    },
    idEstablishment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "establishment"
    }
})

const Product = mongoose.model('product', productSchema);

module.exports = Product;