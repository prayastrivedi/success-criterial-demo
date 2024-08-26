const fs = require('fs');
const path = 'example.txt';

// Write to a file synchronously
try {
  fs.writeFileSync(path, 'Hello, world!', 'utf8');
  console.log('File written successfully!');
} catch (err) {
  console.error('Error writing file:', err);
}

// Read from a file synchronously
try {
  const data = fs.readFileSync(path, 'utf8');
  console.log('File content:', data);
} catch (err) {
  console.error('Error reading file:', err);
}

// Append to a file synchronously
try {
  fs.appendFileSync(path, '\nAppended text!', 'utf8');
  console.log('File appended successfully!');
} catch (err) {
  console.error('Error appending file:', err);
}

// Delete a file synchronously
try {
  fs.unlinkSync(path);
  console.log('File deleted successfully!');
} catch (err) {
  console.error('Error deleting file:', err);
}
