import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import style from "./Cart.module.css";
import axios from "axios";
import MercadoPago from "./MercadoPago/MercadoPago";
import { getCartUser } from "../../actions";
import carrito from "../Cart/carritoVacio.png";

const Cart = () => {
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [size, setSize] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.dataUser.cartID);
  const divisa = "USD";
  const decuent = "-30%";
  useEffect(() => {
    handleDataCart();
  }, []);

  useEffect(() => {
    handlePrice();
  }, [cart]);

  const handleDataCart = async () => {
    if (cart?.length === 0) {
      try {
        console.log(dataUser)
        const cartID = dataUser.cartID;
        const response = await axios.get(
          `/cart/${cartID}`
        );
        setCart(response.data[0]?.Videogames);
        setSize(response.data[0]?.Videogames.length);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteGame = async (gameId) => {
    try {
      const cartIdLocal = dataUser.cartID;
      const data = {
        gameID: gameId,
        cartID: cartIdLocal,
      };
      const response = await axios.post(
        `/cart/delete`,
        data
      );
      setCart(response.data[0]?.Videogames);
      setSize(response.data[0]?.Videogames.length);
      dispatch(getCartUser(user));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrice = () => {
    const total = cart?.reduce((accumulator, item) => {
      return accumulator + item.quantity * item.unit_price;
    }, 0);
    setPrice(total);
  };

  const handleGoHome = () => {
    history.push("/home");
  };

  return (
    <div>
      <div>
        <NavBar size={size} />
      </div>
      <div className={style.total}>
        <div className={style.listCart}>
          {cart?.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className={style.cart_box}>
                <div className={style.cart_img}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={style.image}
                  />
                  <div>
                    <button
                      className={style.removeButton}
                      onClick={() => deleteGame(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div>
                  <div className={style.contPrice}>
                    <p className={style.gameDesc}>{decuent}</p>
                    <p className={style.gameDivisa}>{divisa}</p>
                    <p className={style.price}> {item.unit_price}</p>
                  </div>
                  <h1 className={style.title}>{item.title}</h1>
                </div>
              </div>
            ))
          ) : (
            <div className={style.emptyCart}>
              <p className={style.title}>No games in cart...</p>
              <img
                className={style.carrito}
                src={carrito}
                alt="Carrito vacío"
              />
              <button className={style.goHomeButton} onClick={handleGoHome}>
                Go Home
              </button>
            </div>
          )}
        </div>
        <div className={style.totalPrice}>
          <div className={style.listPrice}>
            {cart?.length > 0
              ? cart.map((item) => (
                  <div key={item.id} className={style.cart_pay}>
                    <div>
                      <h1 className={style.title}>{item.title}</h1>
                      <div className={style.contPrice}>
                        <p className={style.gameDesc}>{decuent}</p>
                        <p className={style.gameDivisac}>{divisa}</p>
                        <p className={style.price}> {item.unit_price}</p>
                        <p className={style.priceB}>
                          {" "}
                          {((item.unit_price * 100) / 70).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          <div className={style.textTotal}>
            <span className={style.totalA}>
              Total: {((price * 100) / 70).toFixed(2)} USD
            </span>
            <br />
            <span className={style.totalDesc}>
              desc{" "}
              {(((price * 100) / 70).toFixed(2) - price?.toFixed(2)).toFixed(2)}{" "}
              USD
            </span>
            <br />
            <h2>Total with desc: {price?.toFixed(2)} USD</h2>
            {price > 0 && (
              <div className={style.pay}>
                <MercadoPago arrayGames={cart} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
