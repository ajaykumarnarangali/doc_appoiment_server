const Appointment = require('../../models/Appointment');
const APIError = require("../../shared/error/APIError");

exports.updateStatus = async (id, payLoad) => {

    const statusValues = ['pending', 'approved', 'rejected', 'cancelled'];
    if (!statusValues.includes(payLoad.status)) {
        throw new APIError(401, "incorrect status value");
    }
    const appointment = await Appointment.findByIdAndUpdate(id, {
        $set: { status: payLoad.status }
    }, { new: true });

    if (!appointment) {
        throw new APIError(404, "Appointment not found or could not update status");
    }

    return appointment;
}