const authRouter = require('../routes/authRouter');
const userRouter = require('../routes/userRouter');
const adminRouter = require('../routes/adminRouter');
const doctorRouter = require('../routes/doctorRouter');

function routerLoader(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/admin', adminRouter);
    app.use('/api/doctor', doctorRouter);
}

module.exports = {
    routerLoader
}