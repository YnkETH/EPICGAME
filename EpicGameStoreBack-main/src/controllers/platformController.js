const { Videogame, Platform, Developers, Genre} = require("../db.js");
const axios = require('axios');
const { API_KEY } = process.env;


const createPlatform = async (req, res, next) => {
    try {
      const platforms = await Platform.findAll()
      if(platforms.length === 0){
        const url = `https://api.rawg.io/api/platforms?key=${API_KEY}`;
        const response = await axios.get(url);
        const platformsData = response.data.results;
        const platformsToAdd = platformsData.map(platform => ({ platformName: platform.name }));
        await Platform.bulkCreate(platformsToAdd);
      }
      next();
    } catch (error) {
      next(error);
    }
  }

const getPlatforms = async function(){
    try {
        const platforms = await Platform.findAll();
        return platforms;
    } catch (error) {
        throw new Error(error);
    };
};



module.exports = { getPlatforms, createPlatform}