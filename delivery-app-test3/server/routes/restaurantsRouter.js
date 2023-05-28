const express = require('express');

const router = express.Router();

const Restaurant = require('../models/restaurantModel');

router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).send({ data: restaurants });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
