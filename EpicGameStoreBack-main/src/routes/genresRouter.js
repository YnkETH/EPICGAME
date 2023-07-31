require('dotenv').config();
const express = require('express');
const { allGenres } = require("../handlers/activityGenres")
const genresRouter = express.Router();

genresRouter.get('/', allGenres);

module.exports = genresRouter