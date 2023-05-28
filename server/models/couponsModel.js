const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponsSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  code: { type: String, required: true },
  sale: { type: String, required: true },
});

module.exports = mongoose.model('Coupons', CouponsSchema);
