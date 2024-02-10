const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images/uploads'); // Specify the directory where uploaded files will be stored
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + uuidv4(); // Generate a unique filename using UUID
    cb(null, uniqueSuffix + '-' + file.originalname); // Use original filename with a unique prefix
  }
});

const upload = multer({ storage: storage });
module.exports =upload;