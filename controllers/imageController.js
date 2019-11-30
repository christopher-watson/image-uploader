const imageModel = require('../models/imageModel');
const cloud = require('../config/cloudinaryConfig');

module.exports = {
  createCloudImage: function(req, res) {
    try {
      let imageDetails = {
        imageName: req.body.imageName
      };

      imageModel.find(
        { imageName: imageDetails.imageName },
        (err, callback) => {
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
            let imageDetails = {
              imageName: req.body.imageName,
              cloudImage: req.files[0].path,
              imageId: ''
            };
            cloud.cloudUpload(imageDetails.cloudImage).then(result => {
              let imageDetails = {
                imageName: req.body.imageName,
                cloudImage: result.url,
                imageId: result.id
              };
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
        }
      );
    } catch (execptions) {
      console.log(execptions);
    }
  }

  // findAll: function (req, res) {
  //   db
  //     .Image
  //     .find(req.query)
  //     .sort({
  //       date: 1
  //     })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // findById: function (req, res) {
  //   db
  //     .Image
  //     .findById(req.params.id)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // create: function (req, res) {
  //   db
  //     .Image
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // update: function (req, res) {
  //   db
  //     .Image
  //     .findOneAndUpdate({
  //       _id: req.params.id
  //     }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function (req, res) {
  //   db
  //     .Image
  //     .findById({
  //       _id: req.params.id
  //     })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
};
