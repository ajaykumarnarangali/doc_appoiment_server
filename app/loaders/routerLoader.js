const authRouter = require('../routes/authRouter');
const userRouter = require('../routes/userRouter');
const adminRouter = require('../routes/adminRouter');
const doctorRouter = require('../routes/doctorRouter');
const appoinmentRouter = require('../routes/appoinmentRouter');

function routerLoader(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/admin', adminRouter);
    app.use('/api/doctor', doctorRouter);
    app.use('/api/appointment', appoinmentRouter);
}

module.exports = {
    routerLoader
}