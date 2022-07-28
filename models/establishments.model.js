const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const establishmentSchema = new Schema({
    name: {
        type: String,
        required: 'The establishment name is required'
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
    foodType: {
        type: [String]
    },
    address: {
        type: String,
        required: 'The address is required'
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [Number]
    }
});

establishmentSchema.index({ location: '2dsphere' });

const Establishment = mongoose.model('establishment', establishmentSchema);
module.exports = Establishment;