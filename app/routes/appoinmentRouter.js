const express = require('express');
const router = express.Router();
const { authorizeUser, authorizeRole } = require('../middleware/authorizeUser');
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { appointmentController } = require('../controllers/index');

router
    .route('/new')
    .post(authorizeUser, authorizeRole('user,admin'), appointmentController.newAppointment)
    .all(fourOhFiveHandler);



module.exports = router;