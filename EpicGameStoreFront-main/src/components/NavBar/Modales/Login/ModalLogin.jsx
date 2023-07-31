import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import ButtonGoogleLogin from './googleSingin/ButtonGoogleLogin'
import "./Modal.css";
import { getDataUser } from '../../../../actions';
import { setModalLogin } from "../../../../actions";
import { useDispatch, useSelector } from "react-redux";
import ModalRegister from '../Registro/ModalRegister';

const ModalLogin = () => {

  const isModalLogin = useSelector((state) => state.modalLogin);
  const dispatch = useDispatch()

  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOpenLogin = () => {
    dispatch(setModalLogin(true,false))
  };

  const handleCloseLogin = () => {
    dispatch(setModalLogin(false,false))
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password
    }
    console.log(user);
    try {
      const response = await axios.post('/users/login', user);
      console.log(response.data);
      const Token = response.data.token

      const dataUser = {
        nombre: response.data.user.userName,
        userID: response.data.user.id,
        cartID: response.data.user.Carritos?.id,
        role: response.data.user?.role,
        image: response.data.user?.userImage,
        mail: response.data.user?.userEmail
      }
      console.log(dataUser);
      dispatch(getDataUser(dataUser));
      localStorage.setItem('userData', JSON.stringify(dataUser));
      localStorage.setItem('Token', JSON.stringify(Token));
      handleCloseLogin();
      console.log(dataUser);
      window.location.reload();
    } catch (error) {
      alert("error")
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleOpenLogin} className={styles.navButton}>Login</button>
        {isModalLogin && (
          <div className="modal-overlay-login">
            <div className="modal-content-login">
            <div className={styles.loginForm}>
              <button onClick={handleCloseLogin} className={styles.navButton}>Cerrar</button>
              <h2 className={styles.loginFormH2}>Iniciar sesión</h2>
              <form onSubmit={handleSubmit} className={styles.loginFormForm}>
                <div className={styles.loginForm}>
                  <div className={styles.labelLoginData}>
                    <label htmlFor="email">Correo electrónico:</label>
                  </div>
                  <div>
                    <input
                      className={styles.loginFormInput}
                      type="email"
                      id="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className={styles.loginFormLabel} htmlFor="password">Contraseña:</label>
                  </div>
                  <div>
                    <input
                      className={styles.loginFormInput}
                      type="password"
                      id="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className={styles.buttonRegister}>Iniciar sesión</button>
              </form>
              <div>
              <ButtonGoogleLogin className={styles.buttonGoogle} handleCloseLogin={handleCloseLogin}/>
              </div>
              <hr/>
              <div className={styles.goLogin}>
                  Are you not registered? please                  
                  <ModalRegister/>                                
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalLogin;
