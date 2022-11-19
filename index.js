require("dotenv").config();
const app = require("./src/app");
const appInit = require("./src/config/Database");
appInit(app);
