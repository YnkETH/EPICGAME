import React from "react";
import "./Modal.css";
import { useState } from "react";
import styles from "./UserModal.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ModalUser({ image }) {
  const [isOpen, setIsOpen] = useState(false);
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const iconUser = dataUser ? dataUser?.nombre?.charAt(0).toUpperCase() : "";
  const history = useHistory();
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const imageIcon = () => {
    if (image && image.length !== 0) {
      return (
        <div>
          <img
            className={styles.userIcon}
            onMouseEnter={handleOpenModal}
            src={dataUser.image}
            alt="Foto de perfil"
          />
        </div>
      );
    } else {
      return (
        <button onMouseEnter={handleOpenModal} className={styles.userIcon}>
          {iconUser}
        </button>
      );
    }
  };
  const btnClick = () => {
    localStorage.setItem("userData", JSON.stringify({}));
    localStorage.setItem("Token", JSON.stringify({}));
    history.push("/home");
    window.location.reload();
  };
  return (
    <div>
      <div>{!isOpen && imageIcon()}</div>
      <div>
        {isOpen && (
          <img className={styles.userIcon} src={dataUser.image} alt="" />
        )}
      </div>

      {isOpen && (
        <div onMouseLeave={handleCloseModal}>
          <div className="modal-overlay">
            <div className={"modal-content"}>
              <p className={styles.h1}>Name: {dataUser.nombre.toUpperCase()}</p>
              <p className={styles.h1}>Rol: {dataUser.role.toUpperCase()}</p>
              {dataUser.role === "cliente" ? (
                <Link to={"/miPerfil"}>
                  <p className={styles.h1}>{"My profile"}</p>
                </Link>
              ) : dataUser.role === "admin" ? (
                <Link to={"/admin"}>
                  <p className={styles.h1}>{"My profile"}</p>
                </Link>
              ) : dataUser.role === "vendedor" ? (
                <Link to={"/vendor"}>
                  <p className={styles.h1}>{"My profile"}</p>
                </Link>
              ) : null}
              <Link to={"/favorites"}>
                <p className={styles.h1}>{"Favorites"}</p>
              </Link>
              <Link to={"/cart"}>
                <p className={styles.h1}>{"Cart"}</p>
              </Link>
              <button onClick={btnClick} className={styles.navButton}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalUser;
