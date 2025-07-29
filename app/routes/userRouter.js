const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { userController } = require('../controllers/index');
const { authorizeUser } = require('../middleware/authorizeUser');
const multer = require('../middleware/multer');

router
    .route('/get-user')
    .get(authorizeUser, userController.getUser)
    .all(fourOhFiveHandler);

router
    .route('/profile')
    .put(authorizeUser, userController.updateProfile)
    .all(fourOhFiveHandler);

router
    .route('/profile-image')
    .put(authorizeUser, multer.single('image'), userController.profileImage)
    .all(fourOhFiveHandler);


module.exports = router;