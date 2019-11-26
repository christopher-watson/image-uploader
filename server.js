const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

// Set up Express
const app = express();
app.use(morgan('dev')); // for logging
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Error handler
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

// Import routes
// const routes = require('./server/routes');
// app.use(routes);

// DB Config
const keys = require('./config/keys');

// Connect to MongoDB
// mongoose.connect(keys.mongoURI,{ useNewUrlParser: true, dbName: 'lwatson-db' })
//   .then(() => console.log("💾  ==> DB successfully connected"))
//   .catch(err => console.log(err));

// Start the API server
const server = http.createServer(app);
const PORT = process.env.PORT || 3030;
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}`);
});
