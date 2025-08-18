const Appointment = require('../../models/Appointment');
exports.userPayable = async (userId) => {
    const appointments = await Appointment.find({
        userId,
        isPaymentComplete: false
    },'_id date time status isPaymentComplete').populate('doctorId', '_id username speciality address fees image')
    return appointments
}