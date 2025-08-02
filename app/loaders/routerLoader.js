const authRouter = require('../routes/authRouter');
const userRouter = require('../routes/userRouter');
const adminRouter = require('../routes/adminRouter');

function routerLoader(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/admin', adminRouter);
}

module.exports = {
    routerLoader
}