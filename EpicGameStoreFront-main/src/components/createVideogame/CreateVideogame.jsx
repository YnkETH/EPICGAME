import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres, getPlatforms } from "../../actions/index.js";
import styles from "./createVideogame.module.css";
import LoadingPage from "../loadingPage/LoadingPage.jsx";
import axios from "axios";

function isImage(url) {
  return /\.(jpg|jpeg|png)$/.test(url);
}

const validate = (input) => {
  const errors = {};
  const today = new Date();
  const selectedDate = new Date(input.launchDate);
  const validPastDate = new Date("1950-01-01");
  if (!input.name) {
    errors.name = "A name for your videogame is required";
  } else if (!input.description) {
    errors.description = "Please provide a breaf description of the videogame";
  } else if (input.description.length < 20) {
    errors.description = "Please the description need to be more specific";
  } else if (!input.launchDate) {
    errors.launchDate = "Please provide a valid launch date";
  } else if (selectedDate > today) {
    errors.launchDate = "Please provide a date in the past";
  } else if (selectedDate < validPastDate) {
    errors.launchDate = "Please provide a date after 1950";
  } else if (input.rating < 0) {
    errors.rating = "Please provide a valid rating";
  } else if (input.rating > 5) {
    errors.rating = "Please provide a rating between 0 and 5";
  } else if (!input.genreIds || input.genreIds.length === 0) {
    errors.genreIds = "Please select at least one genre";
  } else if (!input.platforms || input.platforms.length === 0) {
    errors.platforms = "Please select at least one platform";
  } 
  return errors;
};

export default function CreateVideogame() {

  const preset_key = "images";
  const cloud_name = "drgco4gsh";
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  const dispatch = useDispatch();
  const history = useHistory();
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(``);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    launchDate: "",
    rating: 0,
    genreIds: [],
    platforms: [],
    image: "",
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
    setErrors(
      validate({
        ...input,
      })
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput({
      ...input,
    });
    setErrors(
      validate({
        ...input,
      })
    );
    if (Object.keys(errors).length === 0) {
      dispatch(postVideogame(input));
      alert("Videogame Created¡¡");
      setInput({
        name: "",
        description: "",
        launchDate: "",
        rating: 0,
        genreIds: [],
        platforms: [],
        image: "",
      });
      history.push("/home");
    } else {
      alert(
        "Please fix the following errors:\n\n" +
          Object.values(errors).join("\n")
      );
    }
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleGenreSelect = (genreId) => {
    if (!input.genreIds.includes(genreId)) {
      setInput((prevInput) => ({
        ...prevInput,
        genreIds: [...prevInput.genreIds, genreId],
      }));
    }
    setErrors(
      validate({
        ...input,
      })
    );
  };

  const handleGenreDelete = (genreId) => {
    const currentGenres = input.genreIds.filter((id) => id !== genreId);
    setInput({
      ...input,
      genreIds: currentGenres,
    });
    setErrors(
      validate({
        ...input,
      })
    );
  };

  const handlePlatformSelect = (platformId) => {
    if (!input.platforms.includes(platformId)) {
      setInput({
        ...input,
        platforms: [...input.platforms, platformId],
      });
    }
    setErrors(
      validate({
        ...input,
      })
    );
  };

  const handlePlatformDelete = (platformId) => {
    const currentPlatfroms = input.platforms.filter((id) => id !== platformId);
    setInput({
      ...input,
      platforms: currentPlatfroms,
    });
    setErrors(
      validate({
        ...input,
      })
    );
  };

  const getGenreName = (genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre ? genre.genreName : "";
  };

  const getPlatformName = (platformId) => {
    const platform = platforms.find((platform) => platform.id === platformId);
    return platform ? platform.platformName : "";
  };

  if (genres.length === 0 || platforms.length === 0) {
    return <LoadingPage />;
  }

  const upLoadImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset_key);
    setLoading(true);
    try {
      const response = await axios.post(cloudinaryUrl, data);
      console.log(response);
      setInput({
        ...input,
        image: response.data.secure_url,
      });
      setImage(response.data.secure_url);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      {genres.length === 0 || platforms.length === 0 ? (
        <LoadingPage />
      ) : (
        <div className={styles.container}>
          <div className={styles.form}>
            <h1>¡Create a Videogame!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label>Name: </label>
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={handleChange}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </div>
              <div className={styles.descriptionContainer}>
                <label htmlFor="description">Description:</label>
                <textarea
                  value={input.description}
                  name="description"
                  onChange={handleChange}
                  className={styles.descriptionInput}
                />
                {errors.description && (
                  <p className={styles.error}>{errors.description}</p>
                )}
              </div>
              <div>
                <label>Launch Date: </label>
                <input
                  type="date"
                  value={input.launchDate}
                  name="launchDate"
                  onChange={handleChange}
                />
                {errors.launchDate && (
                  <p className={styles.error}>{errors.launchDate}</p>
                )}
              </div>
              <div>
                <label>Rating: </label>
                <input
                  type="number"
                  step="0.1"
                  min={0}
                  value={input.rating}
                  name="rating"
                  onChange={handleChange}
                />
                {errors.rating && (
                  <p className={styles.error}>{errors.rating}</p>
                )}
              </div>
              <div>
                <label>Developer: </label>
                <textarea
                  value={input.developer}
                  name="developer"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Price: </label>
                <input
                  type="number"
                  step="0.1"
                  min={0}
                  value={input.price}
                  name="price"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Stock: </label>
                <input
                  type="number"
                  min={0}
                  value={input.stock}
                  name="stock"
                  onChange={handleChange}
                />
              </div>
              <div>
              <span>Picture</span>
              <img
                src={image}
                alt="por favor sube una imagen"
                placeholder="Videogame picture..."
              />
            </div>
            <input
              type="file"
              name="file"
              onChange={upLoadImage}
              placeholder="N/A"
            />
              <div>
                <label>Genre: </label>
                <select onChange={(e) => handleGenreSelect(e.target.value)}>
                  {genres.map((genre) => (
                    <option value={genre.id}>{genre.genreName}</option>
                  ))}
                </select>
                {errors.genreIds && (
                  <p className={styles.error}>{errors.genreIds}</p>
                )}
              </div>
              <div>
                <label>Platform: </label>
                <select onChange={(e) => handlePlatformSelect(e.target.value)}>
                  {platforms.map((platform) => (
                    <option value={platform.id}>{platform.platformName}</option>
                  ))}
                </select>
                {errors.platforms && (
                  <p className={styles.error}>{errors.platforms}</p>
                )}
              </div>
              <div className={styles.list}>
                <h3>Genres:</h3>
                <br />
                <ul>
                  {input.genreIds.map((genreId) => {
                    const genreName = getGenreName(genreId);
                    return (
                      <div>
                        <li key={genreId}>{genreName}</li>
                        <button
                          onClick={() => {
                            handleGenreDelete(genreId);
                          }}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </ul>
              </div>
              <div className={styles.list}>
                <h3>Platforms:</h3>
                <ul>
                  {input.platforms.map((platformId) => {
                    const platformName = getPlatformName(platformId);
                    return (
                      <div>
                        <li key={platformId}>{platformName}</li>
                        <button
                          onClick={() => {
                            handlePlatformDelete(platformId);
                          }}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </ul>
              </div>
              <div>
                <button type="submit">Create videogame</button>
              </div>
            </form>
          </div>
          <Link to="/home">
            {" "}
            <button>Go Back</button>{" "}
          </Link>
        </div>
      )}
    </div>
  );
}