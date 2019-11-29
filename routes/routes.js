var express = require('express');

//IMPORT CONTROLLER
var imageController = require('../database/controller');
var upload = require('../config/multerConfig');
var router = express.Router();

//WHEN A POST IS MADE TO THE ROUTE, IT WILL ENTER THE IMAGE CONTROLLER.
//.any() ACCEPTS ALL FILES THAT COMES OVER THE WIRE.
router.post('/addImage', upload.any(), imageController.createApp);
module.exports = router;
