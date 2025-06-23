const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { authController } = require('../controllers/index');

router
    .route('/register')
    .post(authController.registerUser)
    .all(fourOhFiveHandler);

router
    .route('/verify-otp')
    .post(authController.verifyOtp)
    .all(fourOhFiveHandler);

router
    .route('/login')
    .post(authController.Login)
    .all(fourOhFiveHandler);

router
    .route('/refresh-token')
    .post(authController.refreshToken)
    .all(fourOhFiveHandler);

module.exports = router;