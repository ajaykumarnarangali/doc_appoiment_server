const express = require('express');
const app = express();
const { expressLoader } = require('./loaders/expressLoader');
const {mongooseLoader}=require('./loaders/mongooseLoader');

async function Loader (){
    await expressLoader(app);
    await mongooseLoader();
}

module.exports={
    Loader,
    app
}