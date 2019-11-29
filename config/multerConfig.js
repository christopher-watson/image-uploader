const multer = require('multer');
const path = require('path');

//multer.diskStorage() creates a storage space for storing files.
const storage = multer.diskStorage({
  // destination: function(req, file, cb) {
  //   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  //     cb(null, '../public/uploads');
  //   } else {
  //     cb({ message: 'this file is invalid for upload' }, false);
  //   }
  // },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    // cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });
module.exports = upload;
