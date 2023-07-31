import { useEffect, useState } from "react";
import style from "./FormularioEditar.module.css";
import { Link, useHistory } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
import TermsAndConditions from "./TermsAndConditions";

function FormularioEditar({ user }) {
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const token = JSON.parse(localStorage.getItem("Token"));
    const country = localStorage.getItem("country")

    const dataUser = JSON.parse(localStorage.getItem("userData"));
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [usDelete, setUsDelete] = useState(false)

    const [newUsername, setNewUsername] = useState("");
    const [image, setImage] = useState(dataUser?.image);

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
          console.log(response);
          setImage(response.data.secure_url);
          setLoading(false);
        } catch (error) {
          console.log(error);
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
            axios.patch(`/users/${dataUser.userID}`, NewUser, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    localStorage.setItem("userData", JSON.stringify({}));
                    localStorage.setItem('Token', JSON.stringify({}));
                    alert("Datos actualizados con exito, inicia Sesion")
                    history.push("/home");
                })
        } catch (error) {
            alert(error.message)
        }
    };

    const updateRol = () => {
        let NewUser = { role: "vendedor" };
        try {
            axios.patch(`/users/${user.id}`, NewUser, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    localStorage.setItem("userData", JSON.stringify({}));
                    localStorage.setItem('Token', JSON.stringify({}));
                    alert("Datos actualizados con exito, inicia Sesion")
                    history.push("/home");
                })   
        } catch (error) {
            alert(error.message);
        }
    }

    const updatePass = () => {
        let NewUser = {};
        if (currentPassword.length !== 0) {
            NewUser.userPassword = currentPassword;
        }
        if (newPassword.length !== 0) {
            NewUser.newPassword = newPassword;
        }
    }

    const updateActive = () => {
        let NewUser = { active: false };
        try {
            axios.patch(`/users/${user.id}`, NewUser, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    localStorage.setItem("userData", JSON.stringify({}));
                    localStorage.setItem('Token', JSON.stringify({}));
                    alert("Datos actualizados con exito, inicia Sesion")
                    history.push("/home");
                })   
        } catch (error) {
            alert(error.message);
        }
    }
    const hendrleDelete = () => {
        alert("Si eliminas tu cuenta no podras registrarte de nuevo a menos que lo solicites a un Admin, ¿Estas Seguro?")
        setUsDelete(true)
    }
    useEffect(() => { }, [loading]);

    return (
        <div className={style.conteiner}>
            <div className={style.formCont}>
                <h1>Informacion Personal</h1>
                <div className={style.form}>
                    <label className={style.inputFormu}>
                        <div className={style.itemForm}>
                            <span className={style.itemName}>Name</span>
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder={user.userName}
                                className={style.inputext}
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
                                className={style.inputext}
                            />
                        </div>
                    </label>
                    <label className={style.inputFormu}>
                        <div className={style.itemForm}>
                            <div className={style.conImage}>
                                <span className={style.itemName}>Your Picture</span>
                                <img
                                    className={style.foto}
                                    src={user.image || image}
                                    alt=""
                                    placeholder="Tu Foto"
                                />
                            </div>
                            <input
                                type="file"
                                name="file"
                                onChange={upLoadImage}
                                placeholder="N/A"
                                className={style.inputext}
                            />
                        </div>
                    </label>
                    <label className={style.inputFormu}>
                        <div className={style.itemForm}>
                            <span className={style.itemName}>Rol</span>
                            <input
                                type="text"
                                value={user.role}
                                placeholder={user.role}
                                className={style.inputext}
                            />
                        </div>
                    </label>
                    <label className={style.inputFormu}>
                        <div className={style.itemForm}>
                            <span className={style.itemName}>Region</span>
                            <input
                                type="text"
                                value={country}
                                placeholder={country}
                                className={style.inputext}
                            />
                        </div>
                    </label>
                    <label className={style.inputFormu}>
                        <div className={style.itemForm}>
                            <span className={style.itemName}>Lenguage</span>
                            <input
                                type="text"
                                value={"Español"}
                                placeholder={"Español"}
                                className={style.inputext}
                            />
                        </div>
                    </label>
                    <button className={style.btn} onClick={updatesUser}>
                        Update
                    </button>
                </div>
            </div>
            {/* <div className={style.vendor}>
                <span className={style.title}>Cambiar Contraseña</span>
                <label className={style.inputFormu}>
                    Contraseña actual:
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className={style.inputext}
                    />
                </label>
                <label className={style.inputFormu}>
                    Contraseña nueva:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className={style.inputext}
                    />
                </label>
                <button className={style.btn} onClick={updatePass}>
                    Sent
                </button>
                <button className={style.btn} onClick={hendrleDelete}>
                    Delete Acount
                </button>
                {usDelete && (
                    <button className={style.btn}  onClick={updateActive}>Delete</button>
                )}
            </div> */}
        </div>
    );
}

export default FormularioEditar;