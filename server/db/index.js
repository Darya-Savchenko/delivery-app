const mongoose = require('mongoose');

mongoose
  .connect(`${process.env.DB_FULL_PATH}`, { useNewUrlParser: true })
  .catch((e) => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;
