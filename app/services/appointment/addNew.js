const Appointment = require('../../models/Appointment');
const APIError = require('../../shared/error/APIError');

exports.newAppointment = async (payLoad) => {
    const { doctorId, userId, date, time } = payLoad
    const slotTaken = await Appointment.findOne({ doctorId, date, time });
    if (slotTaken) {
        throw new APIError(400, 'Time slot already booked');
    }

    const newAppointment = new Appointment({
        doctorId: doctorId,
        userId: userId,
        date: date,
        time: time,
        isPaymentComplete: false,
        status: 'pending'
    });

    const data = await newAppointment.save();
    if (!data) {
        throw new APIError(500, 'error while taking appointment')
    }
}