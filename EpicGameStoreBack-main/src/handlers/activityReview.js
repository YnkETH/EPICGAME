const { createReview, getReviewsById, getAllReviews } = require("../controllers/reviewController")
const { Videogame, Users, Review } = require ("../db.js");

const postReview = async (req,res) =>{
    console.log(req);
    const { userId, gameId, rating, comment} = req.body
    console.log(req.body)
    try {     

        const respuesta = await createReview(
            userId,
            gameId,
            rating, 
            comment
            )
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const getReviews = async(req, res) => {
    const { userId} = req.params
    try {
        const reviewsGet = await getReviewsById(userId)
        res.status(200).json(reviewsGet)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getReviewsAll = async(req, res) => {

    try {
        const reviewsGetAll = await getAllReviews()
        res.status(200).json(reviewsGetAll)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports =  { postReview, getReviews, getReviewsAll } 