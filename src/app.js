// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const app = express();
const port = process.env.PORT || 3000;
const logger = require('./config');
require('dotenv').config();

// app.js
const myEmitter = require('./eventEmitter');

// Define additional listeners or handle events here
myEmitter.on('greet', (name) => {
  console.log(`Welcome, ${name}!`);
});

// Emit the event again to see the additional listeners in action
myEmitter.emit('greet', 'Charlie');


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
 
  
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/usercrud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => logger.info('MongoDB connected'))
.catch(err => logger.error(`MongoDB connection error: ${err.message}`));
// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

  app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging
  
    // Set the response status code and send the error message
    res.status(err.status || 500).json({
      error: {
        message: err.message,
        status: err.status || 500
      }
    });
  });
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

module.exports = app;