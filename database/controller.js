//IMPORT THE MODEL WE CREATED EARLIER
var imageModel = require('../database/model');

//IMPORT CLOUDINARY CONFIG HERE
var cloud = require('../config/cloudinaryConfig');
exports.createApp = (req, res) => {
  try {
    var imageDetails = {
      imageName: req.body.imageName
    };
    //USING MONGO METHOD TO FINE IF IMAGE-NAME EXIST IN THE DB
    imageModel.find({ imageName: imageDetails.imageName }, (err, callback) => {
      //CHECKING IF ERROR OCCURRED
      if (err) {
        res.json({
          err: err,
          message: 'There was a problem uploading this image'
        });
      } else if (callback.length >= 1) {
        res.json({
          message: 'A file with this name already exists'
        });
      } else {
        var imageDetails = {
          imageName: req.body.imageName,
          cloudImage: req.files[0].path,
          imageId: ''
        };
        // IF ALL THING GO WELL, POST THE IMAGE TO CLOUDINARY
        cloud.uploads(imageDetails.cloudImage).then(result => {
          var imageDetails = {
            imageName: req.body.imageName,
            cloudImage: result.url,
            imageId: result.id
          };
          //THEN CREATE THE FILE IN THE DATABASE
          imageModel.create(imageDetails, (err, created) => {
            if (err) {
              res.json({
                err: err,
                message: 'Could not upload image, try again'
              });
            } else {
              res.json({
                created: created,
                message: 'Image uploaded successfully!!'
              });
            }
          });
        });
      }
    });
  } catch (execptions) {
    console.log(execptions);
  }
};
