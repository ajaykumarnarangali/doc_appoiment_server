const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { authorizeRole, authorizeUser } = require('../middleware/authorizeUser');
const { doctorController } = require('../controllers/index');
const upload = require('../middleware/multer');

router
    .route('/profile')
    .put(authorizeUser, authorizeRole('doctor'), doctorController.updateProfile)
    .all(fourOhFiveHandler);

router
    .route('/profile-image')
    .put(authorizeUser, authorizeRole('doctor'), upload.single('image'), doctorController.profileImage)
    .all(fourOhFiveHandler);


module.exports = router;