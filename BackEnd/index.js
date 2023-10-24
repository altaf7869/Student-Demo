const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/admin_demo', { useNewUrlParser: true, useUnifiedTopology: true });

// Load models
require('./models/course');
require('./models/state');
require('./models/city');
require('./models/student');
require('./models/user');

// routes 
app.use('/api/courses', require('./routes/courses'));
app.use('/api/states', require('./routes/states'));
app.use('/api/cities', require('./routes/cities'));
app.use('/api/students', require('./routes/students'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
