const { Videogame, Users, Review } = require ("../db.js");

const createReview = async (userId, gameId, rating, comment) =>{

        try {
         
        const newUser = await Users.findByPk(userId)
        console.log(newUser)
        const newGame = await Videogame.findByPk(gameId)
        console.log(newGame)

        const stat = await newGame.getStat();
        await stat.increment('totalReviews');
        const newReview = await Review.create(
            {
                rating: rating,
                comment: comment
            }
        )
        
        await newReview.addUsers(newUser)

        console.log(newReview)
        await newReview.addVideogame(newGame)
        return newReview
        
        } catch (error) {
        return {error: 'Not comments'}
    }
    
}

const getReviewsById = async (userId) => {

    const reviewById = await Videogame.findByPk(userId, {
        include : [
        
            {model : Review,
             include: [
                {model: Users}
             ]} 
        ]
    })
  return reviewById;
  }


  const getAllReviews = async () => {
    const allReviews = await Review.findAll()
    return allReviews

  }




module.exports = { createReview, getReviewsById, getAllReviews }