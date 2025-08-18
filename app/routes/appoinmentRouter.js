const express = require('express');
const router = express.Router();
const { authorizeUser, authorizeRole } = require('../middleware/authorizeUser');
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { appointmentController } = require('../controllers/index');

router
    .route('/new')
    .post(authorizeUser, authorizeRole('user', 'admin'), appointmentController.newAppointment)
    .all(fourOhFiveHandler);

router
    .route('/doctor')
    .get(authorizeUser, authorizeRole('user', 'admin'), appointmentController.doctorAppointments)
    .all(fourOhFiveHandler);

router
    .route('/user')
    .get(authorizeUser, authorizeRole('doctor'), appointmentController.doctorUsers)
    .all(fourOhFiveHandler);

router
    .route('/:id/status')
    .put(authorizeUser, authorizeRole('doctor', 'user'), appointmentController.updateStatus)
    .all(fourOhFiveHandler);

router
    .route('/payable')
    .get(authorizeUser, authorizeRole('user'), appointmentController.userPayable)
    .all(fourOhFiveHandler);

module.exports = router;