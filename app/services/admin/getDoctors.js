const User = require('../../models/User');

exports.getDoctors = async () => {
    const doctors = await User.find({ role: 'doctor' }, '_id username image speciality');
    return doctors;
}