const { findVideogameByIdDB, findVideogameByName} = require("../controllers/findController.js");
const { getVideogames, getVideogamesByGenre, patchGame, createGame } = require("../controllers/videogamesController.js")


const getAllVideogames = async (req,res) => {
    try {
        const { name, genreName } = req.query;
        if(name){
            const videogames = await findVideogameByName(name);
            res.status(200).json(videogames);
        }else if(genreName){
            const videogames = await getVideogamesByGenre(genreName);
            res.status(200).json(videogames);
        }
        else{
            const videogames = await getVideogames();
            res.status(200).json(videogames);
        };
    } catch (error) {
        res.status(400).json({error: error.message});
    };
}

const getVideogamesById = async (req, res) => {
    const { id } = req.params;
    try {
        let videogame = {};
            videogame = await findVideogameByIdDB(id);
            res.status(200).json(videogame);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};

const postVideogames = async (req, res) => {
    try {
        const role = req.user.role; 
        const id = req.user.id 
        if(role === "cliente"){
            res.status(403).json("ingresa con una cuenta de vendedor");
        }else{
            const { name, description, launchDate, rating, image, price, stock , genreIds, platforms, developer} = req.body;
            const newVideogame = await createGame(name, description, launchDate, rating, image, price, stock , genreIds, platforms, developer, id);
            res.status(200).json(newVideogame);
        };
    } catch (error) {
        res.status(500).send('Internal server error');
    };
};

const patchVideogame = async(req, res) => {
    try {
        const role = req.user.role; 
        const userId = req.user.id 
        const { id } = req.params;
        const updates = req.body;
        if(role === "cliente"){
            res.status(403).json("ingresa con una cuenta de vendedor");
        }else{
            const response = await patchGame(id, userId, updates);
            res.status(200).json(response);
        };
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

module.exports= { getAllVideogames, getVideogamesById, postVideogames, patchVideogame }