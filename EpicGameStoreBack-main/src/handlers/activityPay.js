const { getPreference, createPreference, getFeedback, pay } = require("../controllers/payController");
const {Users, Carrito, Videogame, Stat} = require("../db.js");

const getPay = async (req, res) => {
    const {cartId, userId } = req.body
    try {
        const user = await Users.findByPk(userId)
        const cart = await Carrito.findByPk(cartId)
        const newCart = await pay(user, cart)
        res.status(200).json(newCart)
    } catch (error) {
        res.status(400).json({ error:error.message });
    }
}

const postPay = async(req, res) => {
    try {
        let preference = await getPreference(req)
        console.log(preference);
        let newPreference = createPreference(preference, res)
        return newPreference
    } catch (error) {
        res.status(400).json({ error:error.message });
    };
};

const getFeedPay = async(req, res) => {
    try {
        const feed = await getFeedback(req)
        res.status(200).json(feed)
    } catch (error) {
        res.status(400).json({ error:error.message });
    };
};

const managePay = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await handlePayment(id);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error:error.message });
    }
}

module.exports = {
    getPay, 
    postPay, 
    getFeedPay,
    managePay
}