const router = require('express').Router();
const upload = require('../../config/multerConfig');
const imageController = require('../../controllers/imageController');

//  ROUTE: URL/api/images/

// upload any image
router.post(
  '/createCloudImage',
  upload.any(),
  imageController.createCloudImage
);

module.exports = router;
