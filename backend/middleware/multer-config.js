//Importing of multer
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Creating a config object for multer, registering with diskStorage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const nom = file.originalname.substring(0, file.originalname.lastIndexOf("."));
    const name = nom.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

//Purpose of multer = implement single file (one image) downloads
module.exports = multer({ storage: storage }).single('image');