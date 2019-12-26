const User = require('../models/userModel');

module.exports = {
  getAllUsers: function(req, res) {
    User.find(req.query)
      .sort({
        date: 1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserName: function(req, res) {
    // console.log(req.params)
    User.findOne({
      email: req.params.username
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUserById: function(req, res) {
    User.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createUser: function(req, res) {
    User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addImageToUser: function(req, res) {
    User.findOneAndUpdate(
      // email as parameter
      { email: req.params.id },
      // image id as body
      { $push: { _images: req.body } }
      // {safe: true, upsert: true},
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeImageFromUser: function(req, res) {
    console.log(req.params.id);
    User.findOneAndUpdate(
      // email as parameter
      { email: req.params.id },
      { $pull: { _images: req.body } },
      { multi: true }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addImageAtIndex: function(req, res) {
    User.findOneAndUpdate(
      // email as parameter
      { email: req.params.id },
      // image id as body
      {
        $push: {
          _images: {
            $each: [req.body],
            $position: req.query.pos
          }
        }
      }
      // {safe: true, upsert: true},
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // updateUser: function(req, res) {
  //   User.findOneAndUpdate(
  //     {
  //       _id: req.params.id
  //     },
  //     req.body
  //   )
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // removeUser: function(req, res) {
  //   User.findById({
  //     _id: req.params.id
  //   })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },

  // register: function (req, res) {
  //   const user = new User({
  //     username: req.body.username,
  //   })
  //   User
  //     .register(user, req.body.password, function (err) {
  //       if (err) {
  //         console.log('error while user register!', err);
  //         return res.status(422).json(err);
  //       }
  //       console.log('user registered!');
  //       res.json(true);
  //     });
  // },
};
