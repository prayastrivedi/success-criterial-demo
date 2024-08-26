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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
