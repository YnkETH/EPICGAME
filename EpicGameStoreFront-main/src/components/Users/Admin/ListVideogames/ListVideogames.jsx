import React, { useEffect } from 'react';
import styles from './Listvideogames.module.css';
import axios from 'axios';


const ListVideogames = ({ lista, token, handleGetStatsVideogames, getListVideogame}) => {

  const handleInaVideogame = async (id,state) => {
    
    if(state === "inactive"){
      state = "active"
    }else{
      state = "inactive" 
    }
    const update = {
      active: state
    };
    try {
        axios.patch(`/videogames/${id}`, update, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
                getListVideogame()
                handleGetStatsVideogames()
            });
    } catch (error) {
        console.log(error);
    }
  };

  
  return (
    <div className={styles.container}>
      <h2>Videogames</h2>
      <ul className={styles.lista}>
        {lista.map((lista) => (
          <li key={lista.id} className={styles.usuario}>
            <div>
              <span className={styles.nombre}>Nombre: {lista.name}</span>
              <span className={styles.price}>Price: {lista.price}</span>
              <span className={styles.status}>status: {lista.status}</span>
            </div>
            <button className={styles.botonBan} onClick={() => handleInaVideogame(lista.id,lista.status )}>{lista.status === "inactive" ? "Act" : "Ban"}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListVideogames;