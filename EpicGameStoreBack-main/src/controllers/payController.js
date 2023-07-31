const mercadopago = require("mercadopago");
const { creteCart } = require("./cartController");

const pay = async (user, cart) => {
    await cart.update({
        status: false
    })
    const newCart = await creteCart(user)
    return newCart
}

const getPreference = async(req, res) => {
    console.log(req.body)

    const {CartID, UserID, Videogames} = req.body
        const cartItemes = Videogames.map((item) => {
            const items = {
                title: item.title,
                unit_price: item.unit_price,
                quantity: parseInt(item.quantity),
            }

            return items;
        })

    let preference = {
        items: cartItemes,
		back_urls: {
			"success": "http://localhost:3000/pay",
			"failure": "http://localhost:3000/pay",
			"pending": "http://localhost:3000/pay"
		},
		auto_return: "approved",
    }
    return preference
}

const createPreference = async(preference, res) => {
  let newPreference =  mercadopago.preferences
  .create(preference)
      .then(function (response) {
          res.json({
              id: response.body.id
          });
      }).catch(function (error) {
          console.log(error);
      });
    return newPreference
}

const getFeedback = async(req) => {
    let feed = res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
    return feed;
};

const handlePayment = async (cartId) => {
    try {
        const carrito = await Carrito.findOne({
            where: { id: cartId},
            include: [{ model: Videogame }],
          });
          const currentDate = new Date();
          carrito.purchaseDate = currentDate;
          carrito.status = false
          await carrito.save();

          const videogames = carrito.Videogames
          for (const videogame of videogames) {
            await videogame.decrement('stock', { by: 1 });
            if (videogame.stock <= 0) {
                await videogame.update({ status: 'inactive' });
            };
            const stat = await videogame.getStat();
            await stat.update({
                revenue: stat.revenue + videogame.price,
                copiesSold: stat.copiesSold + 1
              });
          };

        const newCart = await Carrito.create();
        newCart.UserId = carrito.UserId; // Set the UserId directly on the Carrito instance
        await newCart.save();

        return newCart.id
    } catch (error) {
        
    }
};

module.exports = {getPreference, createPreference, getFeedback, pay, handlePayment};