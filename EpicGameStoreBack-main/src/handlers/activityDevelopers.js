const { getDevelopers } = require ("../controllers/developerController");

const getAllDevelopers = async (req,res) => {
    try {
        const developers = await getDevelopers();
         res.status(200).json(developers);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { getAllDevelopers }
