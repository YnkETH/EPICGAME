const { Router } = require('express');
const { getPay, postPay, getFeedPay, managePay } = require('../handlers/activityPay');
const payRouter = Router();

payRouter.post("/", getPay)
payRouter.post("/create_preference", postPay)
payRouter.get("/feedback", getFeedPay)
payRouter.get("/succesfulPurchase/:id", managePay)  
module.exports = payRouter;

