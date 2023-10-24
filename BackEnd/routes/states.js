const express = require('express');
const mongoose = require('mongoose');
const State = mongoose.model('State');

const router = express.Router();

router.get('/', async (req, res) => {
  const states = await State.find();
  res.json(states);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const state = new State({ name });
  await state.save();
  res.json(state);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await State.findByIdAndDelete(id);
  res.json({ message: 'State deleted successfully' });
  
});
module.exports = router;
