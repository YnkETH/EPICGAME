import React, { useState } from "react";
import ReactDOM from "react-dom";
import TermsAndConditions from "./TermsAndConditions";
import styles from "./Modal.module.css";

const Modal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    isOpen &&
    ReactDOM.createPortal(
      <div className={styles["modal-overlay"]}>
        <div className={styles["modal-content"]}>
          <button className={styles["modal-close"]} onClick={closeModal}>
            X
          </button>
          <h2 className={styles["modal-title"]}>Terms and Conditions</h2>
          <p className={styles["modal-text"]}>{TermsAndConditions}</p>
          <button className={styles["modal-button"]} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>,
      document.getElementById("modal-root")
    )
  );
};

export default Modal;
