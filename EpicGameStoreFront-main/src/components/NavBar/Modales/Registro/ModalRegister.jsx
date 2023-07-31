import "./Modal.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Register.module.css";
import ButtonGoogleRegister from "./googleSingin/ButtonGoogleRegister";
import { sendEmail } from "../../../../actions";
import { useDispatch, useSelector } from "react-redux";
import ModalLogin from "../Login/ModalLogin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setModalRegister } from "../../../../actions";

function ModalRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isModalRegister = useSelector(state => state.modalRegister);

  const handleOpenRegister = () => {
    dispatch(setModalRegister(true,false))
  };

  const handleCloseRegister = () => {
    dispatch(setModalRegister(false,false))
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUserPost = {
      userName: name,
      userPassword: password,
      userEmail: email,
    };
    try {
      const response = await axios.post(
        "/users/",
        newUserPost
      );
      const { newCart, newUser } = response.data;
      const dataEmail = { email: newUserPost.userEmail };
        dispatch(sendEmail(dataEmail));
      handleCloseRegister();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleOpenRegister} className={styles.navButton}>
          Register
        </button>
        {isModalRegister && (
          <div className="modal-overlay-register">
            <div className="modal-content-register">
              <button onClick={handleCloseRegister} className={styles.navButton}>
                Close
              </button>
              <div className={styles.RegistrationForm}>
                <h2 className={styles.loginFormH2}>REGISTER YOUR ACCOUNT</h2>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <div>
                      <label htmlFor="name">Name:</label>
                    </div>
                    <div>
                      <input
                        placeholder="Name..."
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div>
                      <label htmlFor="email">Email:</label>
                    </div>
                    <div>
                      <input
                        placeholder="Email..."
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        pattern="/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/"
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div>
                      <label htmlFor="password">Password:</label>
                    </div>
                    <div>
                      <input
                        placeholder="Password..."
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        minLength="8"
                        pattern="(?=.*\d)(?=.*[A-Z])\w+"
                        title="Please enter a password with at least 8 characters, one uppercase letter, and one number"
                        required
                      />
                    </div>
                  </div>
                  <button className={styles.buttonRegister}>Register</button>
                </form>
                <div>
                  <ButtonGoogleRegister
                    className={styles.buttonGoogle}
                    handleCloseRegister={handleCloseRegister}
                  ></ButtonGoogleRegister>
                </div>
                <hr />
                <div className={styles.goLogin}>
                  Are you registered? please                  
                  <ModalLogin/>                                
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalRegister;
