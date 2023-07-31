import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetail,
  setCurrentPage,
  getCommentVideoGame,
  clear,
} from "../../actions";
import { useHistory } from "react-router-dom";
import LoadingPage from "../loadingPage/LoadingPage.jsx";
import styles from "./Detail.module.css";
import NavBar from "../NavBar/NavBar.jsx";
import axios from "axios";
import { getCartUser } from "../../actions";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Detail(props) {
  const id = props.match.params.id;

  const dispatch = useDispatch();
  const history = useHistory();
  const [size, setSize] = useState([]);
  const [cart, setCart] = useState([]);

  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const user = useSelector((state) => state.dataUser.cartID);
  const userca = useSelector((state) => state.cartUser);
  const game = useSelector((state) => state.detail);

  const [commentUser, setCommentUser] = useState("");
  const [ratingUser, setRatingUser] = useState("");

  const handleCommentUser = (event) => {
    setCommentUser(event.target.value);
  };
  const handleRatingUser = (event) => {
    setRatingUser(event.target.value);
  };

  const handlePostComment = async () => {
    const comentario = {
      userId: dataUser.userID,
      gameId: game.id,
      comment: commentUser,
      rating: ratingUser,
    };
    await axios.post("/reviews", comentario);
  };

  // const handleClose = (id) => {
  //   dispatch(getDetail(id))
  //   dispatch(clear(id))
  // }

  const commentVideoGame = useSelector((state) => state.commentVideoGame);
  console.log(commentVideoGame);

  let starsU = Number;
  function renderComments() {
    return commentVideoGame.Reviews?.map((review, index) => (
      <div>
        <p className={styles.genreTag} key={index}>
          {review.Users[0]?.userName}
        </p>
        <span className={styles.genreTag} key={index}>
          {review.comment}
        </span>

        {
          (starsU = Array?.from({ length: 5 }, (_, index) => {
            if (index < review.rating) {
              return <FaStar key={index} className={styles.starFilled} />;
            } else {
              return <FaStar key={index} className={styles.starEmpty} />;
            }
          }))
        }

        <span className={styles.genreTag} key={index}>
          {review.Users[0]?.ReviewUsers.createdAt?.slice(0, 10)}
        </span>
      </div>
    ));
  }

  const [favorites, setFavorites] = useState([]);

  const obternerFavoritos = async () => {
    if (dataUser) {
      try {
        const respuesta = await axios.get(`/users/${dataUser.userID}`);
        setFavorites(respuesta.data.Videogames);
      } catch (error) {
        console.log(error);
      }
    }
  };

  let apiRatings = [];
  if (origin === "api" && game?.ratings) {
    apiRatings = game?.ratings.map((rating) => rating.title);
  }

  const decuent = "-30% ";
  const divisa = "USD";
  const {
    Developer,
    Genres,
    Platforms,
    description,
    image,
    launchDate,
    name,
    price,
    rating,
    screenshots,
  } = game;

  function renderGenreTags(genres) {
    return genres?.map((genre, index) => (
      <span className={styles.genreTag} key={index}>
        {genre.genreName}
      </span>
    ));
  }
  const resultado = favorites.find((result) => result.id === game.id);

  function renderPlatformTags(platforms) {
    return platforms?.map((platform, index) => (
      <span className={styles.genreTag} key={index}>
        {platform.platformName}
      </span>
    ));
  }

  const roundedRating = Math.round(rating);
  const stars = Array?.from({ length: 5 }, (_, index) => {
    if (index < roundedRating) {
      return <FaStar key={index} className={styles.starFilled} />;
    } else {
      return <FaStar key={index} className={styles.starEmpty} />;
    }
  });

  const handleClickCart = async (gameId) => {
    if (!dataUser.userID) {
      console.log("logeate");
    } else {
      try {
        const data = {
          gameID: gameId,
          userId: dataUser.userID,
        };
        const response = await axios.post(`/cart`, data);
        dispatch(getCartUser(dataUser.userID));
        setSize(response.data[0].Videogames.length);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clickFavorite = async (gameId) => {
    try {
      const game = {
        userId: dataUser.userID,
        gameId: gameId,
      };
      const respuesta = await axios.post("/favorites", game);
      alert("game add favorites");
      obternerFavoritos();
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteFavorite = async (gameId) => {
    try {
      const game = {
        userId: dataUser.userID,
        gameId: gameId,
      };
      const respuesta = await axios.post(
        "/favorites/delete",
        game
      );
      alert("delete favorites");
      await obternerFavoritos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => dispatch(getCommentVideoGame(id)), []);

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(clear(id));
  }, [dispatch]);
  useEffect(async () => {
    await obternerFavoritos();
  }, []);

  useEffect(async () => {
    if (cart?.length === 0) {
      try {
        const cartID = dataUser.cartID;
        const response = await axios.get(
          `/cart/${cartID}`
        );
        setCart(response.data[0]?.Videogames);
        setSize(response.data[0]?.Videogames.length);
      } catch (error) {}
    }
  }, []);
  if (name) {
    return (
      <div>
        <NavBar size={size} />
        <div className={styles.detailContainer}>
          <h1 className={styles.detailTitle}>{game?.name}</h1>
          <img className={styles.detailImage} src={image} alt={name} />
          <div className={styles.detailInfo}>
            <div className={styles.contButtons}>
              <div className={styles.contPrice}>
                <p className={styles.gameDesc}>{decuent}</p>
                <p className={styles.gameDivisa}>{divisa}</p>
                <p className={styles.gamePrice}>{price}</p>
              </div>
              <button
                className={styles.addButton}
                onClick={() => handleClickCart(game.id)}
              >
                Add to Cart
              </button>
              {!resultado && (
                <button
                  className={styles.favoriteButton}
                  onClick={() => clickFavorite(game.id)}
                >
                  Add favorite
                </button>
              )}
              {resultado && (
                <button
                  className={styles.favoriteButton}
                  onClick={() => DeleteFavorite(game.id)}
                >
                  Delete favorite
                </button>
              )}
            </div>
            <div className={styles.rating}>{stars}</div>
            <p className={styles.detailInfoItem}>
              Developer: {Developer?.name}
            </p>
            <p className={styles.detailInfoItem}>Launch Date: {launchDate}</p>
          </div>
          <h2 className={styles.detailGenresHeading}>Genres:</h2>
          <div className={styles.genres}>{renderGenreTags(Genres)}</div>

          <h2 className={styles.detailPlatformsHeading}>Platforms:</h2>
          <div className={styles.genres}>{renderPlatformTags(Platforms)}</div>
          <h2 className={styles.detailScreenshotsHeading}>Description:</h2>
          <text
            className={styles.detailDescription}
            dangerouslySetInnerHTML={{ __html: description }}
          ></text>
          <h2 className={styles.detailScreenshotsHeading}>Screenshots:</h2>
          <div className={styles.detailScreenshotsContainer}>
            {screenshots?.split(",").map((screenshot, index) => (
              <img
                key={index}
                className={styles.detailScreenshot}
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
              />
            ))}
          </div>

          {dataUser?.nombre ? (
            <div>
              <h2 className={styles.detailScreenshotsHeading}>Commment:</h2>
              <form onSubmit={handlePostComment}>
                <input onChange={handleCommentUser}></input>
                <input
                  onChange={handleRatingUser}
                  type="number"
                  max="5"
                  min="0"
                ></input>
                <button type="submit">Send comment</button>
              </form>
            </div>
          ) : (
            ""
          )}
          <div className={styles.genres}>{renderComments()}</div>
          <div>
            <Link to={"/home"}>
              <button>HOME</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }
}
