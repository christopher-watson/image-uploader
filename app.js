const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const morgan = require('morgan');

dotenv.config();
const app = express();

// HERE WE WILL LET OUR APP TO GET ACCESS TO THE STATIC FOLDERS LIKE CSS, IMAGES
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// app.use(morgan('dev')); // for logging
// app.use('/uploads', express.static('/public/uploads'));

// Connect to MongoDB
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: 30,
    dbName: 'images'
  })
  .then(() => console.log('💾  ==> DB successfully connected'))
  .catch(err => console.log(err));
// mongoose.connection;

// HANDLING CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.headers('Access Control-Allow-Methods', 'POST, PUT, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use(routes);

//HANDLE ERRORS
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

module.exports = app;
