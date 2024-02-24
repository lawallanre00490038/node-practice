const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

// Middleware import
const fileExtLimiter = require('./middleware/fileExtLimiter');
const filePayLoadExists = require('./middleware/filePayLoadExists');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

const PORT = process.env.PORT || 3500;

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', 
    fileUpload( { createParentPath: true }),
    filePayLoadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,

    (req, res) => {
        const files = req.files;
        console.log(files);

        Object.keys(files).forEach(key => {
            const file = files[key];
            file.mv(path.join(__dirname, 'uploads', file.name), (err) => {
                if (err) {
                    return res.status(500).json({ status: 'error', message: err });
                }
            });
        });

        return res.json({ status: 'Success', message: Object.keys(files).toString() });
    }
);