import style from "./NavBar.module.css";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import UserModal from "./Modales/Users/UserModal";
import ModalLogin from "./Modales/Login/ModalLogin";
import ModalRegister from "./Modales/Registro/ModalRegister";
import noUser from "../NavBar/noUser2.png";
import { useEffect, useState } from "react";

import axios from "axios";

export default function NavBar({ size }) {
  const [country, setCountry] = useState("");
  const dataUser = JSON.parse(localStorage.getItem("userData"));

  const handleOpenModalLogin = ModalLogin.handleOpenModalLogin;

  useEffect(() => {
    const storedCountry = localStorage.getItem("country");
    
    if (storedCountry) {
      setCountry(storedCountry);
    } else {
      fetchCountryFromAPI();
    }
  }, []);

  const fetchCountryFromAPI = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        const country = response.data.country_name;
        setCountry(country);
        localStorage.setItem("country", country);
      })
      .catch((error) => {
        console.error("IP geolocation error:", error);
        alert(error.message);
      });
  };

  
  return (
    <nav className={style.nav}>
      <div className={style.navLinks}>
        <div className={style.title}>
          <Link to="/home">EPICGAMESTORE</Link>
        </div>
        <div className={style.a}>
          <Link to="/about">ABOUT</Link>
          {dataUser?.userID && <Link to="/favorites">FAVORITES</Link>}       
        </div>
        {dataUser?.userID &&
        <IconButton aria-label="mostrar items" color="inherit">
          <Badge badgeContent={size} color="secondary">
            <Link to="/cart">
              <ShoppingCartIcon fontSize="large" color="inherit" />
            </Link>
          </Badge>
        </IconButton>}
      </div>

      <div className={style.logout}>
        <div className={style.navButtons}>
          {!dataUser?.userID && <ModalLogin />}

          {!dataUser?.userID && (
            <ModalRegister handleOpenModalLogin={handleOpenModalLogin} />
          )}
          <div className={style.nameContainer}>
          </div>
          {dataUser?.nombre ? (
            <UserModal image={dataUser.image}></UserModal>
          ) : (
            <div className={style.contImage}>
              <img
                className={style.userImg}
                src={noUser}
                alt="Imagen de perfil"
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}