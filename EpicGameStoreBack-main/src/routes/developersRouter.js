const express = require('express');
const { getAllDevelopers } = require("../handlers/activityDevelopers")
const developersRouter = express.Router();

developersRouter.get("/", getAllDevelopers);

module.exports = developersRouter;