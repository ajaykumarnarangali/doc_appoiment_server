const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const path = require('path');
require('dotenv').config();
const { routerLoader } = require('./routerLoader');
const cookieParser = require('cookie-parser');

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load(
    path.join(__dirname, "..", "swagger", "swagger.yaml")
);

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
    app.use('/swagger-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    routerLoader(app);

    app.use(fourOhFourHandler);
    app.use(globalErrorHandler);
}

module.exports = { expressLoader };