const fs = require('fs');
const path = 'example.txt';

// Write to a file asynchronously
fs.writeFile(path, 'Hello, world!', 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File written successfully!');

  // Read from a file asynchronously
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log('File content:', data);

    // Append to a file asynchronously
    fs.appendFile(path, '\nAppended text!', 'utf8', (err) => {
      if (err) {
        console.error('Error appending file:', err);
        return;
      }
      console.log('File appended successfully!');

      // Delete a file asynchronously
      fs.unlink(path, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted successfully!');
      });
    });
  });
});
