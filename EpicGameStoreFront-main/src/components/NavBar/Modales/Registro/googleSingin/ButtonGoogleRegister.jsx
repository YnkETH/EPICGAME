import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import style from "../Register.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ButtonGoogleRegister = ({ handleCloseRegister }) => {
  const history = useHistory();

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const response = await axios.get(
          `/users/emailRegister/${data.user.email}`
        );
        console.log(response.status);
        if (response.status === 200) {
          const newUserPost = {
            userName: data.user.displayName,
            userPassword: "firepass",
            userEmail: data.user.email,
          };
          try {
            const respuestaPost = await axios.post(
              "/users/",
              newUserPost
            );
            console.log(respuestaPost);
            handleCloseRegister();
            //deberia cerrarse el modal y abrirse el modalLogin
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <button className={style.buttonGoogle} onClick={handleClick}>
        Register with Google
      </button>
    </div>
  );
};

export default ButtonGoogleRegister;
