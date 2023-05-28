const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  restaurant: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Dish', DishSchema);
