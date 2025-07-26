const authRouter = require('../routes/authRouter');
const userRouter = require('../routes/userRouter');

function routerLoader(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
}

module.exports = {
    routerLoader
}