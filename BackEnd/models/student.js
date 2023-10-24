const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  mobile: String,
  email: String,
  dob: Date,
  gender: String,
  course: {
    name: { type: String, ref: 'Course' },
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
  },
  state: {
    name: { type: String, ref: 'State' },
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'State' }
  },
  city: {
    state_id: {type: mongoose.Schema.Types.ObjectId, ref: 'State'},
    name: { type: String, ref: 'City' },
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'City' }
  },
  // course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  // state_id: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
  // city_id: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  // course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  // state_id: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
  // city_id: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  address: String
});

module.exports = mongoose.model('Student', studentSchema);
