const http = require('http');
const app = require('./app');

// Start the API server
const server = http.createServer(app);
const PORT = process.env.PORT || 3030;
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}`);
});
