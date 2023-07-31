import React from "react";
import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";
import portada from "./LogoPortada.webp";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

function LandingPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.heading}>Welcome to EpicGameStore!</h1>
          <Link to="/home">
            <button className={styles.enterButton}>GO!</button>
          </Link>
        </div>
        <img className={styles.img} src={portada} alt="Logo Portada" />
      </main>
      <footer className={styles.footer}>
        <p className={styles.copy}>
          &copy; 2023 EpicGameStore. All rights reserved.
        </p>
        <div className={styles.socialMedia}>
          <button className={styles.socialButton}>
            <FaFacebook />
          </button>
          <button className={styles.socialButton}>
            <FaTwitter />
          </button>
          <button className={styles.socialButton}>
            <FaInstagram />
          </button>
          <button className={styles.socialButton}>
            <FaYoutube />
          </button>
          <button className={styles.socialButton}>
            <FaGithub />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
