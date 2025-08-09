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

router
    .route('/add-leave')
    .put(authorizeUser, authorizeRole('doctor'), doctorController.addLeave)
    .all(fourOhFiveHandler);

router
    .route('/remove-leave')
    .put(authorizeUser, authorizeRole('doctor'), doctorController.removeLeave)
    .all(fourOhFiveHandler);

module.exports = router;