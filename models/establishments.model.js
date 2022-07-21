const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const establishmentSchema = new Schema({
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
    foodType: {
        type: Object
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [Number]
    }
})

const Establishment = mongoose.model('establishment', establishmentSchema);

module.exports = Establishment;