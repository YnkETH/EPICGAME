const {addGames, getCart, itemDeleteCart} = require("../controllers/cartController")

const getCartId = async(req, res) => {
    const {
        id
    } = req.params;
    try {
        const getAllCart = await getCart(id)
       res.status(200).json(getAllCart)
    } catch (error) {
        console.log(error)
    }
}

const addItem = async(req, res) => {
    const {
        gameID,
        userId
    } = req.body;

    try {
       const cartId = await addGames(gameID, userId)
       const getAllCart = await getCart(cartId)
       res.status(200).json(getAllCart)
    } catch (error) {
        console.log(error)
    }
}

const deleteItem = async(req, res) => {
    console.log(req.body);
    const {
        gameID,
        cartID
    } = req.body;

    try {
        const resultCartID = await itemDeleteCart(gameID, cartID)
        const getAllCart = await getCart(resultCartID)
        res.status(200).json(getAllCart)
    } catch (error) {
        console.error(error);
    }
}

const getAllCarts = async (req, res, next) => {
    
}

module.exports = {addItem, deleteItem, getCartId}
