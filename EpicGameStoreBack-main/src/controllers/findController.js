require('dotenv').config();
const axios = require('axios').default;
const { Videogame, Genre, Platform, Developers, Stat } = require ("../db.js");3
const { API_KEY } = process.env;
const { getVideogamesDb } = require("./videogamesController.js");


const findVideogameByIdApi = async (apiId) => {
    const url = `https://api.rawg.io/api/games/${apiId}?key=${API_KEY}`;

    try {
        let response = await axios.get(url);
        let videogameRaw = response.data;
        let videogame = (({description, released}) => ({description, released}))(videogameRaw);
        if (response.status === 200) {
            return videogame
        }else {
            throw new Error(response.statusText);
        }   
    } catch (error) {
        throw new Error(error);
    }
};

const findVideogameByIdDB = async (id) => {
  const videogameCheck = await Videogame.findByPk(id);
  const description = videogameCheck.description;
  const apiId = videogameCheck.apiId
  if(!description){
    const videogame = await findVideogameByIdApi(apiId);
    const descriptionApi = videogame.description;
    const launchDate = videogame.released;
    await videogameCheck.update({
      description: descriptionApi,
      launchDate: launchDate
    });
  }
  let videogame = await Videogame.findOne({
    where: {
      id: id,
      status: 'active',
    },
    include: [
      {
        model: Genre,
        attributes: ['genreName'],
        through: {
          attributes: [],
        },
      },
      {
        model: Platform,
        attributes: ['platformName'],
        through: {
          attributes: [],
        },
      },
      {
        model: Developers,
        attributes: ['id', 'name'],
      }
    ],
  });
  
  if(!videogame) throw Error("Videogame does not exist");

  const stat = await videogame.getStat();
  await stat.increment('click');

  return videogame
};


const findVideogameByName = async (name) => {
    try {
      const videogamesDb = await getVideogamesDb();
      const filteredVideogamesDb = videogamesDb.filter((videogame) =>
        videogame.name.toLowerCase().includes(name.toLowerCase())
      );
      
      const mergedVideogames = [...filteredVideogamesDb];
      return mergedVideogames;
    } catch (error) {
      throw new Error(error);
    }
  };


module.exports = { findVideogameByIdApi , findVideogameByIdDB ,findVideogameByName }


