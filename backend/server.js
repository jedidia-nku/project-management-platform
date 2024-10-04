const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch(err => {
  console.error("MongoDB connection error:", err);
});

// Middleware
app.use(bodyParser.json());

// Enabling CORS for all routes
app.use(cors());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/organizations/:id', require('./routes/organizations'));
app.use('/api/organizations', require('./routes/organizations'));
app.use('/api/projects', require('./routes/projects'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
