import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import style from "../Login.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getDataUser } from "../../../../../actions";

const ButtonGoogleLogin = ({ handleCloseLogin }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    signInWithPopup(auth, provider).then(async (data) => {
     try {
      const response = await axios.get(
        `/users/emailLogin/${data.user.email}`
      );
      
   
      const user = response.data.user;    
      const token = response.data.token;
      console.log()
      if (response.status === 200) {
        console.log(user)
        const dataUser = {
          nombre: user?.userName,
          userID: user?.id,
          cartID: user?.Carritos[0].id,
          role: user?.role,
          image: user?.userImage,
          mail: user?.userEmail
        };       

        dispatch(getDataUser(dataUser));
        localStorage.setItem("userData", JSON.stringify(dataUser));
        localStorage.setItem("Token", JSON.stringify(token));
        handleCloseLogin();
        window.location.reload();
      }
       else {
        alert("No user found...");
      }
     } catch (error) {
      alert("Usuario no encontrado" + " " + error.message)
     }
    });
  };
  return (
    <div>
      <button className={style.buttonGoogle} onClick={handleClick}>
        Login with Google
      </button>
    </div>
  );
};

export default ButtonGoogleLogin;
