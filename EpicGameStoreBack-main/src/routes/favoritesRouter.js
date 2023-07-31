const { Router } = require('express');
const favoritesRouter = Router();

const {postFavoritesHandler, getFavoritesHandler, deleteFavoritesHandler}  = require('../handlers/activityFavorite.js');

favoritesRouter.post('/', postFavoritesHandler);
favoritesRouter.get('/:userId', getFavoritesHandler);
favoritesRouter.post('/delete', deleteFavoritesHandler);

module.exports = favoritesRouter;