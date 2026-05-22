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
  app.use(
    cors({
      origin: "http://localhost:4200", // Angular frontend
      credentials: true,
    })
  );
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
