const router = require('express').Router();
const userController = require('../../controllers/userController');

//  ROUTE: URL/api/users/...

// create a new user
router.post('/createUser', userController.createUser);

// add image to user _image array 
router.post('/addImageToUser/:id', userController.addImageToUser);

// get all users
router.get('/getAllUsers', userController.getAllUsers);

// -- api/users/find
router.get('/findByUserName/:username', userController.findByUserName);

// find user by id
router.get('/findByUserId/:id', userController.findUserById);

// remove image -- api/users/remove/:id
router.put('/removeImageFromUser/:id', userController.removeImageFromUser);

// add image at an index-- api/users/addImageAtIndex/:id
router.post('/addImageAtIndex/:id', userController.addImageAtIndex);

module.exports = router;
