const { Router } = require('express');

const { jwtAdminMiddleware } = require(`../handlers/activityJsonWebToken.js`);
const { getUsers, getVideogames, getVideogamesById, getUserById, getUserStats, getVideogameStats } = require("../handlers/activityAdmin.js")

const adminRouter = Router();

adminRouter.get("/users", jwtAdminMiddleware, getUsers);
adminRouter.get("/userStats", jwtAdminMiddleware, getUserStats);
adminRouter.get("/users/:id", jwtAdminMiddleware, getUserById);
adminRouter.get("/videogames", jwtAdminMiddleware, getVideogames);
adminRouter.get("/videogameStats", jwtAdminMiddleware, getVideogameStats);
adminRouter.get("/videogames/:id", jwtAdminMiddleware, getVideogamesById); 


module.exports = adminRouter;

