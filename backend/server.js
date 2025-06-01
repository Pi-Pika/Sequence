const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS for frontend
app.use(cors());

// Serve the images statically from the root-level "images" folder
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

// API to list image filenames from the root-level "images" folder
app.get('/api/images', (req, res) => {
  const imageDir = path.join(__dirname, '..', 'images');

  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read image folder' });
    }
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|svg)$/i.test(file));
    res.json(imageFiles);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
