const { Carrito, Videogame, Users } = require("../db.js");

const creteCart = async(user) => {
    try {
      const newCart = await Carrito.create();
      newCart.UserId = user.id; // Set the UserId directly on the Carrito instance
      await newCart.save();
  
      return newCart;
    } catch (error) {
        console.log(error)
    }

}

const addGames = async(gameID, userID) => {
    try {
        const game =  await Videogame.findByPk(gameID)
        const carrito = await Carrito.findOne({
          where: { UserId: userID, status: true },
          include: [{ model: Videogame }],
        });
        
        const cartID = carrito.id
        
        if (game && cartID) {
          await game.addCarrito(cartID);
        }
        
        return cartID;
    } catch (error) {
        console.log(error)
    }
}

const getCart = async(cartId) => {
    try {
        const allCartGames = await Carrito.findByPk(cartId, {
            include: Videogame,
          });
          const { id, UserId, Videogames } = allCartGames;
          let infoVideoGames = Videogames.map((game) => {
            const newGame = {
                title : game.name,
                unit_price: game.price,
                id: game.id,
                image: game.image,
                quantity: 1
            }
            return newGame
          })

          const extractedData = {
            CartID: id,
            UserID: UserId,
            Videogames: infoVideoGames
          };
          
          return [extractedData];
    } catch (error) {
        console.log(error);
    }
}

const itemDeleteCart = async (gameID, cartID) => {
  try {
    const game = await Videogame.findByPk(gameID);
    const cart = await Carrito.findByPk(cartID);
    if (game && cart) {
      await game.removeCarrito(cart);
      return cart.id;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false; 
  }
};
  

const deleteCart = async (cartID, userID) => {
    try {
      const cart = await Carrito.findByPk(cartID);
      if (cart) {
        await cart.update({ status: false });
        return cart.id
      } else {
        return false; 
      }
    } catch (error) {
      console.error(error);
      return false; 
    }
  };
  

module.exports = {creteCart, addGames, getCart, deleteCart, itemDeleteCart}