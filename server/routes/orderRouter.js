const express = require('express');
const router = express.Router();

const Order = require('../models/orderModel');

router.post('/create-order', async (req, res) => {
  const { dishes, deliveryInfo, coupon } = req.body;

  try {
    const order = new Order({
      dishes,
      deliveryInfo,
      coupon,
    });

    const savedOrder = await order.save();

    res.status(200).send({ data: savedOrder });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
