const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const api_routes = require("./routes/api");
const web_routes = require("./routes/web");
const config = require("./config/config");
const errorHandler = require("./middlewares/errorHandler");
const ROUTES = require("./routes/routes");
const routesList = require("./routes_list");
const app = express();

const logger = require("./utils/logger");
// Static Files
app.use(express.static("public"));

app.use(cookieParser(config.jwtSecret));
app.use(bodyParser.json({ limit: config.parserJsonLimit }));
app.use(bodyParser.urlencoded({ extended: true, limit: config.parserLimit }));

// EJS Template Engine
app.set("view engine", "ejs");

// Routes
app.use(ROUTES.WEB.INDEX, web_routes);
app.use(ROUTES.API.INDEX, api_routes);

// Error Handling Middleware
app.use(errorHandler.e404);
app.use(errorHandler.e500);

app.listen(config.port, () => {
  if (config.setupDb && config.dbUri) require("./config/db");
  const address = config.environment == "development" ? "http://localhost" : "";
  console.info(`Server is running on port ${address}:${config.port}`);

});

module.exports = app;
