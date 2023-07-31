import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getCartUser,
  getGenres,
  favoritesList,
} from "../../actions/index.js";
import LoadingPage from "../loadingPage/LoadingPage.jsx";
import styles from "./Home.module.css";
import NavBar from "../NavBar/NavBar.jsx";
import ConteinerCars from "../ContainerCards/ConteinersCard.jsx";
import axios from "axios";
const token = JSON.parse(localStorage.getItem("Token"));

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const Token = JSON.parse(localStorage.getItem("Token"));
  const [sizeCart, setSizeCart] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const listGames = useSelector((state) => state.favoritesList);

  dispatch(getGenres());

  const handleClickCart = async (gameId) => {
    if (!dataUser.userID) {
      console.log("login please...");
    } else {
      try {
        const data = {
          gameID: gameId,
          userId: dataUser.userID,
        };
        const response = await axios.post(`/cart`, data);
        dispatch(getCartUser(dataUser.userID));
        setSizeCart(response.data[0].Videogames.length);
        setAlertMessage("Game added to Cart...");
        setShowAlert(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clickFavorite = async (gameId) => {
    const game = {
      userId: dataUser?.userID,
      gameId: gameId,
    };
    if (dataUser?.userID) {
      const existingFavorite = await axios.get(
        `/users/userDetail/${dataUser.userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const verifiGameId = existingFavorite.data.Videogames;
      const isGameInFavorites = verifiGameId.some((e) => e.id === gameId);

      if (isGameInFavorites) {
        const respuesta = await axios.post(
          "/favorites/delete",
          game
        );
        setAlertMessage("Game delete to favorites...");
        setShowAlert(true);
        return "Add game";
      }

      if (!isGameInFavorites) {
        try {
          const respuesta = await axios.post("/favorites", game);
          setAlertMessage("Game added to favorites...");
          setShowAlert(true);
          return "Delete game";
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setShowAlert(true);
    }
  };

  useEffect(async () => {
    if (dataUser) {
      try {
        const response = await axios.get(
          `/cart/${dataUser.cartID}`
        );
        dispatch(getCartUser(dataUser.userID));
        setSizeCart(response?.data[0]?.Videogames?.length);
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <div>
      {allVideogames.length === 0 ? (
        <LoadingPage />
      ) : (
        <div className={styles.container}>
          <div>
            <NavBar size={sizeCart} />
          </div>
          {dataUser?.userID &&
          showAlert &&
          alertMessage == `Game delete to favorites...` ? (
            <div className={styles.alert3}>{alertMessage}</div>
          ) : (
            ""
          )}

          {dataUser?.userID &&
          showAlert &&
          alertMessage == `Game added to favorites...` ? (
            <div className={styles.alert}>{alertMessage}</div>
          ) : (
            ""
          )}

          {!dataUser?.userID && showAlert ? (
            <div className={styles.alert2}>Please login !</div>
          ) : (
            ""
          )}

          <ConteinerCars
            allVideogames={allVideogames}
            handleClickCart={handleClickCart}
            clickFavorite={clickFavorite}
          />
        </div>
      )}
    </div>
  );
}
