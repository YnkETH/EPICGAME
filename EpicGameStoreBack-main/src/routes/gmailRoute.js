const { Router } = require("express");
const router = Router();
const {
  sendRegisterMail,
  sendPaymentSuccessMail,
} = require("../controllers/nodemailerController");

router.post("/registersuccess", sendRegisterMail);
router.post("/paymentsuccess", sendPaymentSuccessMail);

module.exports = router;