// eventEmitter.js
const EventEmitter = require('events');

// Create an instance of EventEmitter
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Define a listener for the 'greet' event
myEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit the 'greet' event
myEmitter.emit('greet', 'Alice');
myEmitter.emit('greet', 'Bob');

// Export the instance
module.exports = myEmitter;
