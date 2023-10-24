const express = require('express');
const mongoose = require('mongoose');
const Course = mongoose.model('Course');

const router = express.Router();

router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

router.post('/', async (req, res) => {
  const { name, description } = req.body;
  const course = new Course({ name, description });
  await course.save();
  res.json(course);
});

module.exports = router;
