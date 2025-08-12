const User = require('../../models/User');
const mongoose = require('mongoose');

exports.searchDoctors = (params) => {
    const filterMap = {
        notIncludeId: val => ({ _id: { $ne: val } }),
        speciality: val => val,
        // experience_gte: val => ({ $gte: Number(val) }),
        // name: val => new RegExp(val, 'i') // case-insensitive
    };

    const query = {};
    Object.keys(filterMap).forEach((key) => {
        if (params[key]) {
            query[key] = filterMap[key](params[key]);
        }
    })

    const doctors = User.find(query);
    return doctors;
}