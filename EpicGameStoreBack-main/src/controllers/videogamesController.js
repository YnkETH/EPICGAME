const { Videogame, Platform, Developers, Genre, Users, Stat } = require("../db.js");
require('dotenv').config();
const { createVideogame } = require("./createController.js")

const getVideogamesDb = async () => {
  try {
    const dbvideogames = await Videogame.findAll();
    if(dbvideogames.length ===0 ){
      const newVideogames = await createVideogame();
      return newVideogames
    }else {
      const videogames = await Videogame.findAll({  
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
        where: {
          status: `active`
        }
      });
      
      return videogames
    }
  } catch (error) {
    throw new Error(error);
  };
  
};

const getVideogames = async () => {
    try {
        let videogamesDb =  getVideogamesDb();
        return videogamesDb;
    } catch (error) {
        return new Error(error.message);
    }
}

const getVideogamesByGenre = async (name) => {
    try {
        const videogamesDb = await getVideogamesDb();
        const filteredVideogamesDb = videogamesDb.filter((videogame) => {
            const genreNames = videogame.genres
                ? videogame.genres.map((genre) => genre.genreName.toLowerCase())
                : videogame.Genres.map((genre) => genre.genreName.toLowerCase());
        
            return genreNames.includes(name.toLowerCase());
        });
        

      const mergedVideogames = [...filteredVideogamesDb];
      return mergedVideogames;
    } catch (error) {
      throw new Error(error);
    };
};

const createGame = async (name, description, launchDate, rating, image, price, stock , genres, platforms, developer, sellerId) => {
  try {
    console.log({
      name,
        description,
        launchDate,
        rating,
        image,
        price,
        stock,
    });
    const user = await Users.findByPk(sellerId);
    userRole = user.role;
    userStatus = user.isActive;
    if(!userStatus) return "Cuenda inactiva";

    const game = await Videogame.findOne({
      where: { name: name}
    })
      
    if(game) return "intenta con otro nombre"

    const newVideogame = await Videogame.create({
        name,
        description,
        launchDate,
        rating,
        image,
        price,
        stock,
    });
    const developerDb = await Developers.findOne({
        where: { name: developer }
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

      for (const id of genres) {
        const genre = await Genre.findByPk(id);
        if (genre) {
            await newVideogame.addGenre(genre);
        }
    };

    for (const id of platforms) {
        const platform = await Platform.findByPk(id)
        if (platform) {
            await newVideogame.addPlatform(platform);
        }
    };

    if(userRole === "vendedor"){
      await newVideogame.setSeller(user);
    };

    if(userRole === "admin"){
      await newVideogame.update({
        status: `active` 
      });
    };

    const stat = await Stat.create();
    await newVideogame.setStat(stat);

    return newVideogame;
} catch (error) {
    return new Error(error.message);
};
};

const patchGame = async (videogameId, userId, updates) => {
  try {
    const newName = updates.name;
    const newDescription = updates.description;
    const newImage = updates.image;
    const newscreenshots = updates.screenshots;
    const newPrice = updates.price;
    const newStock = updates.stock;
    const newActive = updates.active
    const videogame = await Videogame.findByPk(videogameId);
    const videogameUser = videogame.userId;
    const user = await Users.findByPk(userId);
    const userRole = user.role;
    const userStatus = user.isActive;
    const updateFields = {};

    if(!userStatus) return "Cuenta inactiva";

    if(videogame.status === `pendingApproval` && userRole !== 'admin') return { message: "Juego pendiente de validación" }
    if (videogameUser !== userId && userRole !== 'admin') return { message: "cuenta no autorizada" };
    if(videogame.status === "banned" && userRole !== 'admin') return { message: "Este juego fue desactivado, por favor contactanos"};
    if(newActive){
      if (newActive !== "banned" && newActive !== "active" && newActive !== "inactive") return { message: "Por favor ingresa un status valido"};
    }

    if (newName) {
      const videogameByName = await Videogame.findOne({
        where: { name: newName}
      });
      if (videogameByName) return 'nombre en uso';
      updateFields.name = newName;
    };

    if (newDescription) updateFields.description = newDescription;
    if(newImage) updateFields.image = newImage;
    if(newscreenshots) updateFields.screenshots = newscreenshots;
    if(newPrice) updateFields.price = newPrice;
    if(newStock) updateFields.stock = newStock;



    if(userRole === "admin"){
        if(newActive) updateFields.status = newActive;
    }else{
      if(newActive === `active` || newActive === `inactive`) updateFields.status = newActive;
    };

    await videogame.update(updateFields);
    const updatedVideogame = await Videogame.findByPk(videogameId);
    return updatedVideogame;
    
  } catch (error) {
      return new Error(error.message);
  };
};


module.exports = { 
  getVideogames , 
  getVideogamesByGenre, 
  getVideogamesDb, 
  patchGame,
  createGame
}