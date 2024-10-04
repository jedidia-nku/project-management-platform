const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://Jedy:1234@naina.bm2f7.mongodb.net/?retryWrites=true&w=majority&appName=Naina');
console.log("Umegongewa DB")
// Middleware
app.use(bodyParser.json());

// Enabling CORS for all routes
app.use(cors());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api//organizations/:id', require('./routes/organizations'));
app.use('/api/organizations', require('./routes/organizations'));
app.use('/api/projects', require('./routes/projects'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});