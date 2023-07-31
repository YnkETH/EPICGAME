import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Pagination from "@mui/material/Pagination";
import styles from "./ConteinerCars.module.css";
import NavbarSec from "../NavBarSec/NavSec";
import { order } from "./filters";
import noGame from "../Home/noGameSearch.gif";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGameFavorite } from "../../actions";

export default function ConteinerCars({
  allVideogames,
  handleClickCart,
  clickFavorite,
}) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState("");
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const token = JSON.parse(localStorage.getItem("Token"));
  const gameFavorites = useSelector((state) => state.gameFavorites);

  const videogamesPerPage = 15;

  const [flagCard, setflagCard] = useState(0);

  useEffect(() => {
    let localOrder = localStorage.getItem("order");
    if (localOrder && localOrder.length > 0) {
      setSortOrder(localOrder);
    }
    let localGenres = localStorage.getItem("genres");
    if (localGenres && localGenres.length > 0) {
      setGenres(localGenres);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder, genres, allVideogames]);

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const handleGenres = (genre) => {
    localStorage.setItem("genres", genre.target.value);
    setGenres(genre.target.value);
  };

  const handleSort = (order) => {
    localStorage.setItem("order", order);
    setSortOrder(order);
  };

  const handleSearch = (name) => {
    setSearchTerm(name);
  };

  const handleReset = () => {
    setSearchTerm("");
    setGenres("");
    setSortOrder("");
    localStorage.removeItem("genres");
    localStorage.removeItem("order");
    setCurrentPage(1);
  };
  const filteredVideogames = allVideogames?.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedVideogames = order(
    filteredVideogames,
    sortOrder,
    genres,
    searchTerm
  );

  const videogames = sortedVideogames?.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  useEffect(async () => {
    if (dataUser.userID) {
      const existingFavorite = await axios.get(
        `/users/userDetail/${dataUser.userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setGameFavorite(existingFavorite.data.Videogames));
    }
  }, []);

  const handlerFavorite = (id) => {
    let isGameInFavorites = gameFavorites?.some((e) => e.id === id);
    if (isGameInFavorites) {
      return "Delete favorite";
    } else {
      return "Add favorite";
    }
  };

  useState(() => {}, [flagCard]);

  return (
    <div className={styles.container}>
      <NavbarSec
        handleSort={handleSort}
        handleSearch={handleSearch}
        handleReset={handleReset}
        handleGenres={handleGenres}
      />
      <div className={styles.cardsContainer}>
        {videogames && videogames.length > 0 ? (
          videogames.map((game) => {
            return (
              <Card
                key={game.id}
                game={game}
                handleClickCart={handleClickCart}
                clickFavorite={clickFavorite}
                buttonFavorites={handlerFavorite(game.id)}
              />
            );
          })
        ) : (
          <div>
            <h3 className={styles.textNoGame}>No favorite games</h3>
            <img className={styles.noGame} src={noGame} alt="" />
          </div>
        )}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          count={Math.ceil(sortedVideogames?.length / videogamesPerPage)}
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}
