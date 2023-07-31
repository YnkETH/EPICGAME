const { findAllGenres } = require("../controllers/genresController");

const allGenres = async (req, res) => {
    try {
        const genres = await findAllGenres()
        res.status(200).json(genres)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { allGenres }