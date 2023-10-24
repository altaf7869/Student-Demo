const express = require('express');
const mongoose = require('mongoose');
const City = mongoose.model('City');

const router = express.Router();

router.get('/', async (req, res) => {
  const cities = await City.find();
  res.json(cities);
});

router.post('/', async (req, res) => {
  const { name, state_id } = req.body;
  const city = new City({ name, state_id });
  await city.save();
  res.json(city);
});

// GET cities by state ID
router.get('/bystate/:stateId', async (req, res) => {
    const { stateId } = req.params;
    const cities = await City.find({ state_id: stateId });
    res.json(cities);
  });
  
module.exports = router;
