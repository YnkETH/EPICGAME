import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import styles from "./Users.module.css";
import Listado from "./Listado/Listado";
import FormularioEditar from "./FormularioEditar/FormularioEditar";

function User() {
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [showForm, setShowForm] = useState(false);
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("Token"));
  
  const settShowForm = () => {
    setShowForm(true);
  };

  const getDataUsers = async () => {
    try {
      const response = await axios.get(`/users/userDetail/${dataUser.userID}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      const respoCart = await axios.get(`/cart/${dataUser.cartID}`);
      console.log(response);
      setUser(response.data);
      if (response.data.role === "cliente") {
        setFavorites(response.data.Videogames);
        setCart(respoCart.data[0].Videogames);
      }
    } catch (error) {
      alert(error.message)
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDataUsers();
  }, []);

  return (
    <div className={styles.container}>
      <NavBar />
      {user && (
        <div className={styles.user_box}>
          <div className={styles.head}>
            <div className={styles.contForm}>
              <FormularioEditar settShowForm={settShowForm} user={user} />
            </div>
            
          </div>
          <div id="modal-root"></div>
            <div className={styles.list}>
              <div>
                <Listado datos={cart} lista={"Carrito"} />
              </div>
              <div>
                <Listado datos={favorites} lista={"Favoritos"} />
              </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default User;
