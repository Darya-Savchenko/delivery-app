const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  dishes: [
    {
      amount: { type: Number },
      id: { type: Number },
      image: { type: String },
      price: { type: Number },
      restaurant: { type: String },
      restaurantId: { type: Number },
    },
  ],
  deliveryInfo: {
    name: { type: String },
    address: { type: String },
    phoneNumber: { type: Number },
    email: { type: String },
    date: { type: Date },
  },
});

module.exports = mongoose.model('Order', orderSchema);
