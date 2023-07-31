import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { useDispatch } from 'react-redux';
import { sendMailPaymentSuccess, getCartUser } from '../../actions';

export const Pay = () => {
    const dataUser = JSON.parse(localStorage.getItem("userData"));
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');
    const [paymentStatus, setPaymentStatus] = useState(null);
    const token = JSON.parse(localStorage.getItem("Token"));
    const [mail, setMail] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const paySuccess = async () => {
            // await getDataUsers();
            if (status === "approved") {
                try {
                    const response = await axios.get(`/pay/succesfulPurchase/${dataUser.cartID}`);
                    console.log(response);
                    let newDataUser = {
                        nombre: dataUser.nombre,
                        userID: dataUser.userID,
                        cartID: response.data,
                        role: dataUser.role,
                        image: dataUser.image
                    };
                    localStorage.setItem("userData", JSON.stringify(newDataUser));
                    let payload = {
                        email: dataUser.mail
                    };
                    console.log(payload.email);
                    dispatch(sendMailPaymentSuccess(payload));
                    setPaymentStatus("success");
                } catch (error) {
                    console.log(error);
                    setPaymentStatus("failure");
                }
            } else if (status === "null") {
                setPaymentStatus("pending");
            } else {
                setPaymentStatus("failure");
            }
        };
        paySuccess();
    }, [status]);

    const getDataUsers = async () => {
        try {
            const response = await axios.get(
                `/users/userDetail/${dataUser.userID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMail(response.data.userEmail);
            console.log(response.data);
        } catch (error) {
            alert(error.message);
            console.log(error.message);
        }
    };

    const clickHome = () => {
        history.push("/home");
    };

    const clickReturnCart = () => {
        history.push("/cart");
    };

    return (
        <div>
            <NavBar />
            {paymentStatus === "success" && (
                <div>
                    <div>
                       ¡¡ TU PAGO SE ACREDITO CON ÉXITO !!
                    </div>
                    <div>
                        <button onClick={clickHome}>HOME</button>
                    </div>
                </div>
            )}
            {paymentStatus === "failure" && (
                <div>
                   ¡¡ LO SENTIMOS EL PAGO NO SE ACREDITO !!
                   <div>
                        <button onClick={clickReturnCart}>REINTENTAR</button>
                    </div>
                   <div>
                        <button onClick={clickHome}>HOME</button>
                    </div>
                </div>
            )}
            {paymentStatus === "pending" && (
                <div>
                   ¡¡ LA ACREDITACION DEL PAGO ESTÁ PENDIENTE !!
                   <span>Te notificaremos cuando se acredite</span>
                   <div>
                        <button onClick={clickHome}>HOME</button>
                    </div>
                </div>
            )}
        </div>
    );
};
