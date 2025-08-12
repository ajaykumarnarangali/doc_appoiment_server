const Appointment = require('../../models/Appointment');
const APIError = require('../../shared/error/APIError');

exports.newAppointment = async (payLoad) => {
    const newAppointment = new Appointment({
        doctorId: payLoad?.doctorId,
        userId: payLoad?.userId,
        date: payLoad?.date,
        time: payLoad?.time,
        isPaymentComplete: false,
        status: 'pending'
    });

    const data = await newAppointment.save();
    if (!data) {
        throw new APIError(500, 'error while taking appointment')
    }
}