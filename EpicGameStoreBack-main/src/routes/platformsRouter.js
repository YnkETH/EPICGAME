const express = require('express');
const { getAllPlatforms } = require("../handlers/activityPlatform.js");

const platformsRouter = express.Router();

platformsRouter.get("/", getAllPlatforms);

module.exports = platformsRouter;