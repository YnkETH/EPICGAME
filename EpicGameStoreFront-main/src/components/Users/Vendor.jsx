import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styles from "./Users.module.css";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import FormularioEditar from "./FormularioEditar/FormularioEditarVendor.jsx";
import CreateVideogame from "../createVideogame/CreateVideogame.jsx";

function Vendor() {
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const [user, setUser] = useState({});
  const [videogames, setVideogames] = useState([]);
  const [editedGames, setEditedGames] = useState({});
  const token = JSON.parse(localStorage.getItem("Token"));
  const [showCreateVideogame, setShowCreateVideogame] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const settShowForm = () => {
    setShowForm(true);
  };

  const handleInputChange = (event, videogameId) => {
    const { name, value } = event.target;
    setEditedGames((prevEditedGames) => ({
      ...prevEditedGames,
      [videogameId]: {
        ...prevEditedGames[videogameId],
        [name]: value,
      },
    }));
  };

  const handleSaveChanges = async (videogameId) => {
    // Save changes to the server or perform any other necessary action
    console.log("Save changes for videogame with ID:", videogameId);
    console.log("Edited attributes:", editedGames[videogameId]);
    try {
      const response = await axios.patch(
        `/videogames/${videogameId}`,
        editedGames[videogameId],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      await getDataUsers();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDataUsers = async () => {
    try {
      const response = await axios.get(
        `/users/vendorDetail/${dataUser.userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      const games = response.data.videogames;
      setVideogames(games);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleToggleCreateVideogame = () => {
    setShowCreateVideogame(!showCreateVideogame);
  };

  useEffect(() => {
    getDataUsers();
  }, []);

  const noEditGames = videogames.filter(
    (videogame) =>
      videogame.status === "banned" || videogame.status === "pendingApproval"
  );
  const editGames = videogames.filter(
    (videogame) =>
      videogame.status === "inactive" || videogame.status === "active"
  );

  return (
    <div>
      <div className={styles.container}>
        <NavBar />
        {user && (
          <div className={styles.user_box}>
            <div className={styles.head}>
              <div className={styles.contForm}>
                <FormularioEditar
                  className={styles.formulario}
                  settShowForm={settShowForm}
                  user={user}
                />
              </div>
            </div>
            {showCreateVideogame && <CreateVideogame />}
            <div>
              <button
                className={styles.navButtonVend}
                onClick={handleToggleCreateVideogame}
              >
                Publica un juego
              </button>
              <h3>
                Recuerda que si el juego esta banneado o pendiente de aprobación
                no se puede editar
              </h3>
              {noEditGames.map((videogame) => (
                <div key={videogame.id}>
                  <h2>{videogame.name}</h2>
                  <p>Price: {videogame.price}</p>
                  <p>Rating: {videogame.rating}</p>
                  <p>Status: {videogame.status}</p>
                  <p>Stock: {videogame.stock}</p>
                  <p>Launch Date: {videogame.launchDate}</p>
                  <h2>Etadisticas: </h2>
                  <p>Cantidad de visualizaciones: {videogame.Stat.click}</p>
                  <p>Copias vendidas: {videogame.Stat.copiesSold}</p>
                  <p>Número de favoritos: {videogame.Stat.favorites}</p>
                  <p>
                    Veces que eliminaron de favoritos:{" "}
                    {videogame.Stat.unfavorites}
                  </p>
                  <p>
                    Cantidad total de reseñas: {videogame.Stat.totalReviews}
                  </p>
                  <p>Ganancias: {videogame.Stat.revenue}</p>
                  <img src={videogame.image} alt={videogame.name} />
                </div>
              ))}
            </div>
            <div>
              <h3>Edita tus juegos activos</h3>
              {editGames.map((videogame) => (
                <div key={videogame.id}>
                  <label htmlFor={`name-${videogame.id}`}>Name:</label>
                  <input
                    type="text"
                    name="name"
                    id={`name-${videogame.id}`}
                    value={editedGames[videogame.id]?.name || videogame.name}
                    onChange={(e) => handleInputChange(e, videogame.id)}
                  />
                  <label htmlFor={`description-${videogame.id}`}>
                    Description:
                  </label>
                  <input
                    type="text"
                    name="description"
                    id={`description-${videogame.id}`}
                    value={
                      editedGames[videogame.id]?.description ||
                      videogame.description
                    }
                    onChange={(e) => handleInputChange(e, videogame.id)}
                  />
                  <label htmlFor={`price-${videogame.id}`}>Price:</label>
                  <input
                    type="number"
                    name="price"
                    id={`price-${videogame.id}`}
                    value={editedGames[videogame.id]?.price || videogame.price}
                    onChange={(e) => handleInputChange(e, videogame.id)}
                  />
                  <label htmlFor={`status-${videogame.id}`}>Status:</label>
                  <select
                    name="status"
                    id={`status-${videogame.id}`}
                    value={
                      editedGames[videogame.id]?.active || videogame.status
                    }
                    onChange={(e) => handleInputChange(e, videogame.id)}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <label htmlFor={`stock-${videogame.id}`}>Stock:</label>
                  <input
                    type="number"
                    name="stock"
                    id={`stock-${videogame.id}`}
                    value={editedGames[videogame.id]?.stock || videogame.stock}
                    onChange={(e) => handleInputChange(e, videogame.id)}
                  />
                  <p>Rating: {videogame.rating}</p>
                  <p>Launch Date: {videogame.launchDate}</p>
                  <img src={videogame.image} alt={videogame.name} />
                  <button onClick={() => handleSaveChanges(videogame.id)}>
                    Save Changes
                  </button>
                  <h2>Etadisticas: </h2>
                  <p>Cantidad de visualizaciones: {videogame.Stat.click}</p>
                  <p>Copias vendidas: {videogame.Stat.copiesSold}</p>
                  <p>Número de favoritos: {videogame.Stat.favorites}</p>
                  <p>
                    Veces que eliminaron de favoritos:{" "}
                    {videogame.Stat.unfavorites}
                  </p>
                  <p>
                    Cantidad total de reseñas: {videogame.Stat.totalReviews}
                  </p>
                  <p>Ganancias: {videogame.Stat.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vendor;
