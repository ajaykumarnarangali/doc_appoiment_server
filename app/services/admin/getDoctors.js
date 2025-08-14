const User = require('../../models/User');

exports.getDoctors = async () => {
    const doctors = await User.find({ role: 'doctor' }, '_id username image speciality').sort({createdAt:1});
    return doctors;
}