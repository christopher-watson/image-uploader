const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes/routes');
const mongoose = require('mongoose');

// HERE WE WILL UTILIZE EXPRESS HTTP REQUESTS
const app = express();

// HERE WE WILL LET OUR APP TO GET ACCESS TO THE STATIC FOLDERS LIKE CSS, IMAGES
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('/public/uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev')); // for logging

// DB Config
const keys = require('./keys/keys');

// Connect to MongoDB
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: 'images' })
  .then(() => console.log("💾  ==> DB successfully connected"))
  .catch(err => console.log(err));
// mongoose.connection;

// HANDLING CORS ERRORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.headers('Access Controll-Allow-Mthods', 'POST, PUT, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

// THIS PART HANDLES THE ROUTING/URL
app.use('/uploads', routes);

//HANDLE ERROR
app.use((req, res, next) => {
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// DO NOT FORGET TO EXPORT THE FILE
module.exports = app;
