const { updateProfile } = require('./updateProfile');
const { profileImage } = require('./profileImage');
const { addLeave } = require('./addLeave');
const {removeLeave}=require('./removeLeave');

module.exports = {
    updateProfile,
    profileImage,
    addLeave,
    removeLeave
}