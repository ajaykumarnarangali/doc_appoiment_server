const User = require('../../models/User');

exports.searchDoctors = (params) => {
    const filterMap = {
        _id: val => ({ $ne: val }),
        speciality: val => val,
        username: val => new RegExp(val, 'i')
        // experience_gte: val => ({ $gte: Number(val) }),
    };

    const query = { role: 'doctor' };
    Object.keys(filterMap).forEach((key) => {
        if (params[key]) {
            query[key] = filterMap[key](params[key]);
        }
    })

    const doctors = User.find(query);
    return doctors;
}