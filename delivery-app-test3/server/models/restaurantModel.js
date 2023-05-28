const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
    {
        id: { type: String, required: true},
        name: { type: String, required: true},
        type: { type: String, required: true},
        image: { type: String, required: true},
    }
)

module.exports = mongoose.model('Restaurant', RestaurantSchema);