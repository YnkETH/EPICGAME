const express = require('express');
const { jwtMiddleware } = require(`../handlers/activityJsonWebToken.js`);
const { getAllVideogames, getVideogamesById, postVideogames, patchVideogame } = require('../handlers/activityVideogames.js');

const videogamesRouter = express.Router();


videogamesRouter.get("/", getAllVideogames);
videogamesRouter.get("/:id", getVideogamesById)
videogamesRouter.post('/', jwtMiddleware, postVideogames);
videogamesRouter.patch(`/:id`, jwtMiddleware, patchVideogame);

module.exports = videogamesRouter;

