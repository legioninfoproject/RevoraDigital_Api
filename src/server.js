const express = require("express");
const cors = require("cors");
const expressip = require("express-ip");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const config = require("./config/db");
const dataConfig = require('./config/config');
const appRoute = require("./appRoute");

const startServer = async() =>{
    await config.establishConnection();
    const app = express();

    const corsOptions = {
        origin: "*", // Must be specific for cookies to work
        credentials: true,
        optionSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
    app.use(expressip().getIpInfoMiddleware);
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use(express.json());
    appRoute.Init(app);
    app.use(express.urlencoded({ extended: true }));
    app.listen(dataConfig?.app?.port, () => {
        console.log(`Server is running on port ${dataConfig.app.port}`);
    });


}

startServer();