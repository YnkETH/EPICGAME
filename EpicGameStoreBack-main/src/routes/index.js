const { Router } = require("express");
const express = require("express");
const genresRouter = require("./genresRouter.js");
const videogamesRouter = require("./videogamesRouter.js");
const platformsRouter = require("./platformsRouter.js");
const { createPlatform } = require("../controllers/platformController.js");
const developersRouter = require("./developersRouter.js");
const userRouter = require("./userRouter.js");
const payRouter = require("./payRouter.js");
const cartRouter = require("./cartRouter.js");
const favoritesRouter = require("./favoritesRouter.js");
const reviewRouter = require("./reviewRouter.js");
const emailRouter = require("./gmailRoute.js");
const adminRouter = require(`./adminRouter.js`);

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(createPlatform);
router.use(express.json());

router.use("/platforms", platformsRouter);
router.use("/genres", genresRouter);
router.use("/videogames", videogamesRouter);
router.use("/developers", developersRouter);
router.use("/users", userRouter);
router.use("/pay", payRouter);
router.use("/cart", cartRouter);
router.use("/favorites", favoritesRouter);
router.use("/admin", adminRouter);
router.use("/reviews",reviewRouter )
router.use("/send-email", emailRouter);
module.exports = router;
