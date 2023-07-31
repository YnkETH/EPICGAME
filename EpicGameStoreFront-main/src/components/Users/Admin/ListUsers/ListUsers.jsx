import React, { useEffect } from 'react';
import styles from './ListUsers.module.css';

const ListUsers = ({ lista, boton, handleEditRole }) => {
  return (
    <div className={styles.container}>
      <h2>Usuarios</h2>
      <ul className={styles.lista}>
        {lista.map((lista) => (
          <li key={lista.id} className={styles.usuario}>
            <div>
              <span>Nombre: {lista.userName}</span>
              <span>----Rol: {lista.role}</span>
            </div>
            <button className={styles.botonBan} onClick={() => boton(lista.id, lista.isActive)}>{lista.isActive ? "Ban" : "Act"}</button>
            <select onChange={(e) => handleEditRole(e, lista.id)} className={styles.select}>
              <option value="">Seleccionar rol</option>
              <option value="vendedor">Vendedor</option>
              <option value="admin">Admin</option>
              <option value="cliente">Cliente</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;

