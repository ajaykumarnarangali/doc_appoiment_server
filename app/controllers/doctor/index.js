const { updateProfile } = require('./updateProfile');
const { profileImage } = require('./profileImage');
const { addLeave } = require('./addLeave');
const { removeLeave } = require('./removeLeave');
const { searchDoctors } = require('./searchDoctors');

module.exports = {
    updateProfile,
    profileImage,
    addLeave,
    removeLeave,
    searchDoctors
}