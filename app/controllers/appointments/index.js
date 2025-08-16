const { newAppointment } = require('./addNew');
const { doctorAppointments } = require('./doctorAppointments');
const {doctorUsers}=require('./doctorUsers');

module.exports = {
    newAppointment,
    doctorAppointments,
    doctorUsers
}