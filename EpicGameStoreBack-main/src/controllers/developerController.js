const { API_KEY } = process.env;
const { Videogame, Platform, Developers, Genre} = require("../db.js");
const axios = require('axios');

let currentPage = 1;
const gamesPerPage = 40;

const getDevelopers = async () => {
    try {
      const response = await axios.get(`https://api.rawg.io/api/developers?key=${API_KEY}&page=${currentPage}&page_size=${gamesPerPage}`);
      const developersData = response.data.results;
      const developersToAdd = developersData.map(developer => ({ "name": developer.name, "games": developer.games.map(g => g.id) }));
      const addedDevelopers = await Developers.bulkCreate(developersToAdd);
  
      if (response.status === 200) {
        const devs = await Developers.findAll();
  
      const allDevelopers = devs.map(developer => ({
        id: developer.id,
        name: developer.name,
        games: developer.games
      }));
      currentPage++; // Increment the current page number
  
      return allDevelopers;
  
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

 module.exports = { getDevelopers }