const express = require("express");
const appRoute = express.Router();

const revoraRouter = require('./RevoraForm/revoraFormRouter');

const baseUrl = '/api/';

appRoute.Init = (app) => {
    app.use(`${baseUrl}revora`, revoraRouter);
}

module.exports = appRoute;