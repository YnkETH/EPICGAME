const { Videogame, Genre, Platform, Developers } = require("../db.js");
const axios = require('axios').default;
const { API_KEY } = process.env;

const findAllGenres = async() => {
    try {
      const genresDb = await Genre.findAll();
      if(genresDb.length === 0){
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genresData = response.data.results;
        const genresToAdd = genresData.map(genre => ({"genreName": genre.name}));
        const genres = await Genre.bulkCreate(genresToAdd);
        if (response.status === 200) {
          return genres;
          }else {
          throw new Error(response.statusText);
          }
      }else{
        return genresDb
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  
  module.exports =  { findAllGenres }