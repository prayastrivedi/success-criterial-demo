// mathUtils.js

// Define functions to be exported
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
};

// Export the functions
module.exports = {
  add,
  subtract,
  multiply,
  divide
};
