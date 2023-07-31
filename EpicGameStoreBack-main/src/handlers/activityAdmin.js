const { getAllUsers } = require('../controllers/userController.js');
const { findVideogameByStatus, findVideogamesBySeller, findAllVideogames, findGameById, findUserById, findUserByStatus, findUserByRole, userStats, videogameStats } = require (`../controllers/adminController.js`)

const getUsers = async (req, res, next) => {
    try {
        const {
            active,
            role
        } = req.query
        if(active){
            const allUsers = await findUserByStatus(active)
            res.status(200).json(allUsers);
        }else if(role){
            const allUsers = await findUserByRole(role);
            res.status(200).json(allUsers);
        }else{
            const allUsers = await getAllUsers();
            res.status(200).json(allUsers);
        }
    } catch (error) {
        res.status(400).json({ error:error.message });
    };
};

const getVideogames = async (req,res) => {
    try {
        const {
            status,
            sellerId
        } = req.query
        if(status){
            const videogames = await findVideogameByStatus(status);
            res.status(200).json(videogames);
        }else if(sellerId){
            const videogames = await findVideogamesBySeller(sellerId);
            res.status(200).json(videogames);
        }else{
            const videogames = await findAllVideogames();
            res.status(200).json(videogames);
        }
    } catch (error) {
        res.status(400).json({ error:error.message });
    };
};

const getVideogamesById = async (req,res) => {
    try {
        const { id } = req.params;
        const videogame = await findGameById(id);
        res.status(200).json(videogame);
    } catch (error) {
        res.status(400).json({ error:error.message });
    }
}

const getUserById = async (req,res) =>{
    try {
        const { id } = req.params;
        console.log(id);
        const user = await findUserById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error:error.message });
    };
};

const getUserStats = async (req, res) => {
    try {
        const stats = await userStats();
        res.status(200).json(stats);
    } catch (error) {
        res.status(400).json({ error:error.message });
    };
};

const getVideogameStats = async (req, res) => {
    try {
        const stats = await videogameStats();
        res.status(200).json(stats);
    } catch (error) {
        res.status(400).json({ error:error.message });
    }
}

module.exports = {
    getUsers,
    getVideogames,
    getVideogamesById,
    getUserById,
    getUserStats,
    getVideogameStats
}