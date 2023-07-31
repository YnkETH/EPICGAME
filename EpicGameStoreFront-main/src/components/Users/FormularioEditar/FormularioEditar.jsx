import { useEffect, useState } from "react";
import style from "./FormularioEditar.module.css";
import { Link, useHistory } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
import TermsAndConditions from "./TermsAndConditions";

function FormularioEditar({ user }) {
  const history = useHistory();
  const country = localStorage.getItem("country")

  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("Token"));
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [image, setImage] = useState(dataUser.image);

  const preset_key = "images";
  const cloud_name = "drgco4gsh";
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  const upLoadImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset_key);
    setLoading(true);
    try {
      const response = await axios.post(cloudinaryUrl, data);
      setImage(response.data.secure_url);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const updatesUser = () => {
    let NewUser = {};
    if (newUsername.length !== 0) {
      NewUser.userName = newUsername;
    }
    if (image?.length !== 0) {
      NewUser.userImage = image;
    }
    try {
      axios
        .patch(`/users/${dataUser.userID}`, NewUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const newDataUser = {
            nombre: response.data.userName,
            userID: response.data.id,
            cartID: response.data.Carritos[0].id,
            role: response.data.role,
            image: response.data.userImage,
            mail: response.data.userEmail,
          };
          localStorage.setItem("userData", JSON.stringify(newDataUser));
          alert("¡Datos actualizados con exito!");
          window.location.reload();
        });
    } catch (error) {
      alert(error.message);
    }
  };

    const btnClick = () => {
    localStorage.setItem("userData", JSON.stringify({}));
    localStorage.setItem("Token", JSON.stringify({}));
    history.push("/home");
    window.location.reload();
  };
  
  const updateRol = () => {
            alert("¡El admin revisara tu peticion!");
          window.location.reload();
    // let NewUser = { role: "vendedor" };
    // try {
    //   axios
    //     .patch(`/users/${dataUser.userID}`, NewUser, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((response) => {
    //       const newDataUser = {
    //         nombre: response.data.userName,
    //         userID: response.data.id,
    //         cartID: response.data.Carritos[0].id,
    //         role: response.data.role,
    //         image: response.data.userImage,
    //         mail: response.data.userEmail,
    //       };
    //       localStorage.setItem("userData", JSON.stringify(newDataUser));
    //     });
    // } catch (error) {
    //   alert(error.message);
    // }
  };

  // const updatePass = () => {
  //   let NewUser = {};
  //   if (currentPassword.length !== 0) {
  //     NewUser.userPassword = currentPassword;
  //   }
  //   if (newPassword.length !== 0) {
  //     NewUser.newPassword = newPassword;
  //   }
  //   console.log(NewUser);
  // };

  // const updateActive = () => {
  //   let NewUser = { active: false };
  //   console.log(NewUser);
  //   alert(
  //     "Your request has been sent, you will soon receive a response from an administrator"
  //   );
  // };

  useEffect(() => {}, [loading]);

  return (
    <div className={style.conteiner}>
      <div className={style.formCont}>
        <h1>Personal Information</h1>
        <div className={style.form}>
          <label className={style.inputFormu}>
            <div className={style.itemForm}>
              <span className={style.itemName}>Name</span>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder={user.userName}
              />
            </div>
          </label>
          <label className={style.inputFormu}>
            <div className={style.itemForm}>
              <span className={style.itemName}>Mail</span>
              <input
                type="email"
                value={user.userEmail}
                placeholder={user.userEmail}
              />
            </div>
          </label>
          <label className={style.inputFormu}>
            <div className={style.itemForm}>
              <span className={style.itemName}>Your Picture</span>
              <img
                className={style.foto}
                src={user.image || image}
                alt=""
                placeholder="You Picture..."
              />
            </div>
            <input
              type="file"
              name="file"
              onChange={upLoadImage}
              placeholder="N/A"
            />
          </label>
          <label className={style.inputFormu}>
            <div className={style.itemForm}>
              <span className={style.itemName}>Rol</span>
              <input type="text" value={user.role} placeholder={user.role} />
            </div>
          </label>
          <label className={style.inputFormu}>
            <div className={style.itemForm}>
              <span className={style.itemName}>Country</span>
              <input type="text" value={country} placeholder={country} />
            </div>
          </label>
          <label className={style.inputFormu}>
            <div className={style.itemForm}>
              <span className={style.itemName}>Lenguage</span>
              <input type="text" value={"Español"} placeholder={"Español"} />
            </div>
          </label>
          <button className={style.btn} onClick={updatesUser}>
            Update
          </button>
        </div>
      </div>
{/*       <div className={style.vendor}>
        <span className={style.title}>Roll Sales</span>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span onClick={handleModalOpen}>Accept Terms and Conditions</span>
        </label>
        <button className={style.btn} onClick={btnClick} disabled={!isChecked}>
          Solicitar
        </button>
        {showModal && (
          <Modal onClose={handleModalClose}>
            <h2>Terms and Conditions</h2>
            <p>{TermsAndConditions}</p>
            <button onClick={handleModalClose}>Close</button>
          </Modal>
        )} */}
        {/* <span className={style.title}>Change Password</span>
        <label className={style.inputFormu}>
          Actual password:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <label className={style.inputFormu}>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </label>
        {/* <button className={style.btn} onClick={updatePass}> */}
          {/* Sent */}
        {/* </button>
        <button className={style.btn} onClick={updateActive}>
          Delete Acount
        </button> */} 
      </div>
    </div>
  );
}

export default FormularioEditar;
