const { newAppointment } = require('./addNew');
const { doctorAppointments } = require('./doctorAppointments');
const { doctorUsers } = require('./doctorUsers');
const { updateStatus } = require('./updateStatus');
const { userPayable } = require('./userPayable');

module.exports = {
    newAppointment,
    doctorAppointments,
    doctorUsers,
    updateStatus,
    userPayable
}