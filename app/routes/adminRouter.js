const express = require('express');
const router = express.Router();
const { adminController } = require('../controllers/index');
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { authorizeRole, authorizeUser } = require('../middleware/authorizeUser');
const upload = require('../middleware/multer');


router
    .route('/add-doctor')
    .post(upload.single('image'), authorizeUser, authorizeRole('admin'), adminController.addDoctor)
    .all(fourOhFiveHandler);

module.exports = router;