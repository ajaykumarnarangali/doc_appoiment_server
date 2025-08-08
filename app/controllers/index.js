const authController = require('./auth/index');
const userController = require('./user/index');
const adminController = require('./admin/index');
const doctorController = require('./doctor/index');


module.exports = {
    authController,
    userController,
    adminController,
    doctorController
};