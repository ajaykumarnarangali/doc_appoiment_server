const Appointment = require('../../models/Appointment');
const mongoose = require('mongoose');

exports.doctorAppointments = async ({ doctorId, date }) => {

    const appointment = await Appointment.aggregate([
        {
            $match: {
                doctorId: new mongoose.Types.ObjectId(doctorId),
                date: date.trim()
            }
        },
        {
            $group: {
                _id: '$doctorId',
                bookedSlots: { $push: '$time' }
            }
        }
    ]);

    return appointment;
}