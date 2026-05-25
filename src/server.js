const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/db");
const dataConfig = require('./config/config');
const appRoute = require("./appRoute");

const serverIntiate = async () => {
  await config.establishConnection();

  const app = express();

  // CORS connection for frontend
   app.use((req, res, next) => {

        res.header('Access-Control-Allow-Origin', "http://localhost:4200");
        res.header('Access-Control-Allow-Headers', true);
        res.header('Access-Control-Allow-Credentials', 'Content-Type');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      
        res.header('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
        next();
      });
       const corsOptions = {
        origin: '*',
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200,
    }
    app.use(cors(corsOptions));
    
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // logger
  app.use(morgan("dev"));
  appRoute.Init(app);
  // Create HTTP server
  const http = require("http");
  const server = http.createServer(app);
   server.listen(dataConfig?.app?.port, '0.0.0.0', () => console.log(`Application listening on the port :${dataConfig.app.port}`));
};

serverIntiate();
