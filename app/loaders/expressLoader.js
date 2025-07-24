const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const { routerLoader } = require('./routerLoader');
const cookieParser = require('cookie-parser');

const {
    bodyParserHandler,
    fourOhFourHandler,
    globalErrorHandler } = require('../shared/error/errorHandler');

async function expressLoader(app) {
    app.use(morgan('dev'));
    app.use(cors({
        origin: process.env.FRONT_END_URL
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(bodyParserHandler);

    routerLoader(app);

    app.use(fourOhFourHandler);
    app.use(globalErrorHandler);
}

module.exports = { expressLoader };