const { getPlatforms } = require('../controllers/platformController')

const getAllPlatforms = async (req,res) => {
    try {
        const platforms = await getPlatforms();
         res.status(200).json(platforms);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { getAllPlatforms }