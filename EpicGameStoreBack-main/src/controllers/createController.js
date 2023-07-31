require('dotenv').config();
const { Videogame, Genre, Platform, Developers, Stat } = require("../db.js");
const { getVideogamesApi } = require('./apiController.js')
const { findAllGenres } = require("../controllers/genresController.js");
const { getDevelopers } = require ('./developerController.js')

const createdGame = async (name, description, launchDate, rating, image, screenshots, price, stock , genres, platforms, developer) => {
    try {
        const screenshotsString = screenshots.join(',');
        const newVideogame = await Videogame.create({
            name,
            description,
            launchDate,
            rating,
            image,
            screenshots: screenshotsString,
            price,
            stock,
        });

        const developerDb = await Developers.findOne({
            where: { name: developer },
          });
          
          if (developerDb) {
            // Developer with the given name exists in the database
            await developerDb.update({
                games: [...developerDb.games, newVideogame.id],
            });
          } else {
            // Developer with the given name does not exist in the database
            const newDev = await Developers.create({
                name: developer,
                games: [newVideogame.id],
            });
            await newVideogame.setDeveloper(newDev.id);
          }

          for (const name of genres) {
            const genre = await Genre.findOne({
                where: { genreName: name },
              });
            if (genre) {
                console.log("in use");
                await newVideogame.addGenre(genre);
            } 
        };

        for (const name of platforms) {
            const platform = await Platform.findOne({
                where: { platformName: name },
              });
            if (platform) {
                await newVideogame.addPlatform(platform);
            }
        };

        return newVideogame;
    } catch (error) {
        console.log(error);
    }
};



const addGenresToVideogame = async (videogameId, genreNames) => {
  try {
    const videogame = await Videogame.findOne({ where: { apiId: videogameId } });
    if (!videogame) {
      throw new Error(`Videogame with ID ${videogameId} not found`);
    }

    for (const name of genreNames) {
      const genre = await Genre.findOne({ where: { genreName: name } });
      if (genre) {
        await videogame.addGenre(genre);
      }
    }
    
    return videogame;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add genres to the videogame');
  }
};

const addPlatformsToVideogame = async (videogameId, platformNames) => {
  try {
    const videogame = await Videogame.findOne({ where: { apiId: videogameId } });
    if (!videogame) {
      throw new Error(`Videogame with ID ${videogameId} not found`);
    }

    for (const name of platformNames) {
      const platform = await Platform.findOne({ where: { platformName: name } });
      if (platform) {  
        await videogame.addPlatform(platform);
      }
    }
    
    return videogame;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add genres to the videogame');
  }
};

const addDeveloper = async (apiId) => {
  try {
    let condition = true;
    const devs = await Developers.findAll();

    while (condition) {
      const currentDevs = await Developers.findAll();
      const matchingDeveloper = currentDevs.find(developer => developer.games.includes(String(apiId)));

      
      if (matchingDeveloper) {
        const videogame = await Videogame.findOne({ where: { apiId } });
        const id = matchingDeveloper.id
        await videogame.setDeveloper(id);
        condition = false; // Exit the loop if a match is found
      }else{
        await getDevelopers();
      };
    };
    
  } catch (error) {
    throw new Error('Failed to add developers to the videogame');
  };
};

const addStatToVideogame = async (apiId) => {
  try {
    const stat = await Stat.create();
    const game = await Videogame.findOne({
      where: { apiId: apiId }
    });
    await game.setStat(stat);
  } catch (error) {
    throw new Error('Failed to add stats to the videogame');
  }
};

const createVideogame = async () => {
  try {
    const videogamesToAdd = await getVideogamesApi();
    await Videogame.bulkCreate(videogamesToAdd);
    genresDb = await findAllGenres();
    //const PlatformsDb = await Platform.findAll();

    for (const videogame of videogamesToAdd) {
      const apiId = videogame.apiId
      const genres = videogame.genres
      const platforms = videogame.platforms
      
      await addDeveloper(apiId);
      await addPlatformsToVideogame(apiId, platforms);
      await addGenresToVideogame(apiId, genres);
      await addStatToVideogame(apiId);
    }

    const videogames = await Videogame.findAll({
      attributes: ['id', 'name', 'description', 'launchDate', 'rating', 'image', 'screenshots', 'price', 'stock', 'status'],
      include: [
        {
          model: Genre,
          attributes: ['id', 'genreName'],
          through: { attributes: [] },
        },
        {
          model: Platform,
          attributes: ['id', 'platformName'],
          through: { attributes: [] },
        },
        {
          model: Developers,
          attributes: ['id', 'name'],
        },
      ],
    });

    const modifiedResponse = videogames.map(videogame => ({
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      launchDate: videogame.launchDate,
      rating: videogame.rating,
      image: videogame.image,
      screenshots: videogame.screenshots,
      price: videogame.price,
      stock: videogame.stock,
      active: videogame.active,
      genres: videogame.Genres.map(genre => ({
        id: genre.id,
        genreName: genre.genreName
      })),
      platforms: videogame.Platforms.map(platform => ({
        id: platform.id,
        platformName: platform.platformName
      })),
      developer: videogame.Developer
    }));
    return modifiedResponse;

  } catch (error) {
       
  }

};

module.exports = { createdGame, createVideogame }; 