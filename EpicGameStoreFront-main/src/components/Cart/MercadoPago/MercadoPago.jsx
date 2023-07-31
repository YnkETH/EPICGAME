import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import styles from "./Mercado.module.css";

const MercadoPago = (props) => {
  const [loading, setLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("TEST-e768084a-76b6-4094-8805-c5f01ba73dab");

  const arrayGames = props.arrayGames;
  const cardID = useSelector((state) => state.dataUser.cardID);
  const userId = useSelector((state) => state.dataUser.userID);

  const createPreference = async () => {
    try {
      setLoading(true); // Mostrar animación de carga
      const order = {
        cardID,
        userId,
        Videogames: arrayGames,
      };
      const response = await axios.post(
        "/create_preference",
        order
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Ocultar animación de carga
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div>
      {!preferenceId && !loading && (
        <button className={styles.buttonPayNow} onClick={handleBuy}>
          Pay Now
        </button>
      )}
      {loading && <div className={styles.loadingAnimation}>.</div>}
      {preferenceId && !loading && (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}
    </div>
  );
};

export default MercadoPago;
