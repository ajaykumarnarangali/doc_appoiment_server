const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { userController } = require('../controllers/index');
const { authorizeUser } = require('../middleware/authorizeUser');

router
    .route('/get-user')
    .get(authorizeUser, userController.getUser)
    .all(fourOhFiveHandler);


module.exports = router;