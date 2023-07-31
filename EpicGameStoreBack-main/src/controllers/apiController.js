const axios = require('axios');
const { API_KEY } = process.env;
const { Developers, Platform } = require ("../db.js");

const getRandomPrice = () => {
    return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
  };
  
const getStockPrice = (max) => {
    return Math.floor(Math.random() * max);
  };

const getVideogamesApi = async () => {
    try {
      const totalPages = 1;
      const gamesPerPage = 20;
      const videogamesApi = [];
  
      for (let page = 1; page <= totalPages; page++) {
        const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${gamesPerPage}`;
        const response = await axios.get(url);
        const videogamesApiRaw = response.data.results;
        const videogames = videogamesApiRaw.map(({ id, name, background_image, genres, platforms, short_screenshots, rating }) => ({
          apiId: id,
          name,
          background_image,
          genres,
          platforms,
          screenshots: short_screenshots,
          rating,
          price: getRandomPrice()-(getStockPrice(20)/100), 
          stock: getStockPrice(15),
          status: `active`
        }));
        videogamesApi.push(...videogames);
      };
  
      const videogames = arrangeApiGames(videogamesApi);
      return videogames;
    } catch (error) {
      throw new Error(error.response.statusText);
    };
  };
    
const arrangeApiGames = (videogames) => {
  const arrangedGames = videogames.map((game) => ({
    apiId: game.apiId,
    name: game.name,
    image: game.background_image,
    genres: game.genres.map((genre) => genre.name),
    platforms: game.platforms.map((platform) => platform.platform.name),
    screenshots: game.screenshots.map((screenshot) => screenshot.image).join(','),
    rating: game.rating,
    price: game.price,
    stock: game.stock,
    status: game.status
  }));
  
  return arrangedGames;
};

module.exports =  { getVideogamesApi }