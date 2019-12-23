const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
  name: {
    type: String,
    default: 'testUser'
  },
  email: {
    type: String,
    default: 'testEmail'
  },
  _images: [String],
  // _images: [
  //   {
  //     // type: Schema.Types.Mixed,
  //     ref: 'Images'
  //   }
  // ]
});

module.exports = mongoose.model('Users', Users);
