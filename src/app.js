// src/app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

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
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });
  
  // Create (POST)
  app.post('/users', async (req, res) => {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Read (GET)
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Read One (GET by ID)
  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Update (PUT)
  app.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete (DELETE)
  app.delete('/users/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (deletedUser) {
        res.status(200).json({ message: 'User deleted' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
