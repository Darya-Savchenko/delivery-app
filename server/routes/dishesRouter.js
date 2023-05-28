const express = require('express');

const router = express.Router();

const Dish = require('../models/dishModel');
const Coupons = require('../models/couponsModel');

router.get('/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).send({ data: dishes });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get('/dishes-by-restaurants', async (req, res) => {
  try {
    const dishes = await Dish.aggregate([
      {
        $group: {
          _id: '$restaurant',
          dishes: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          name: '$_id',
          dishes: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).send({ data: dishes });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
