const env = require('dotenv').config({ path: '../.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');

const app = express();
const dishesRouter = require('./routes/dishesRouter');
const restaurantsRouter = require('./routes/restaurantsRouter');
const couponsRouter = require('./routes/couponsRouter');
const orderRouter = require('./routes/orderRouter');

var corsOptions = {
  origin: `${process.env.CLIENT_URL}`,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Delivering App' });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

app.use('/api', dishesRouter);
app.use('/api', restaurantsRouter);
app.use('/api', couponsRouter);
app.use('/api', orderRouter);
