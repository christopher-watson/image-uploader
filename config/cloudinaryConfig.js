const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config();
// const cloudinary = require('cloudinary').v2;
// const keys = require('../keys/keys');

cloudinary.config({
  cloud_name: 'yowats0n',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploads = file => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(
      file,
      result => {
        // console.log(result)
        resolve({ url: result.secure_url, id: result.public_id });
      },
      { resource_type: 'auto' }
    );
  });
};

// exports.uploads = file => {
//   cloudinary.uploader.upload(file, function(error, result) {
//     console.log(result, error);
//   });
// };
 