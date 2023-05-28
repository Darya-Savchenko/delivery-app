const express = require('express');

const router = express.Router();

const Coupons = require('../models/couponsModel');

router.get('/coupons', async (req, res) => {
  try {
    const coupons = await Coupons.find();
    res.status(200).send({ data: coupons });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
