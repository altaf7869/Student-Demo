const express = require('express');
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

const router = express.Router();

//GET student
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

//Create student
router.post('/', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
 // res.json(student);
  return res.status(201).json({
    message: "Student Added Successfully",
    student,
})
});

// DELETE a Student by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.json({ message: 'Student deleted successfully' });
  
});

// UPDATE a Student by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
  //res.json(updatedStudent);
  return res.status(201).json({
    message: "Student Updated Successfully",
    updatedStudent,
})
});

module.exports = router;
