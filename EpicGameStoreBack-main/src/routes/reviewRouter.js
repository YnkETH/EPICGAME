const { Router } = require('express');
const reviewRouter = Router();
const  { postReview, getReviews, getReviewsAll }  = require("../handlers/activityReview")

reviewRouter.post('/', postReview)
reviewRouter.get('/:userId', getReviews)
reviewRouter.get('/', getReviewsAll)

module.exports = reviewRouter