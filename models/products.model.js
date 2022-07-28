const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: 'The product name is required'
    },
    photo: {
        type: String,
        default: 'https://res.cloudinary.com/dp520ozjl/image/upload/v1659034965/glovo/dvyi5n3bxrymxwrrjgcf.png',
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
        type: Number,
        required: 'The price is required'
    },
    type: {
        type: String
    },
    cluster: {
        type: String,
        required: 'The category is required'
    },
    idEstablishment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "establishment"
    }
})

const Product = mongoose.model('product', productSchema);

module.exports = Product;