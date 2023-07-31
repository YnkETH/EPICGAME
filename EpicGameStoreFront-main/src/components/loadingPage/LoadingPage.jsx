import React from "react";
import styles from "./loadingPage.module.css";
import loadingGif from "./loading.gif"

const LoadingPage = () => { 
    return (
        <div className={styles.container}>
        <div className={styles["loading-overlay"]}>
            <img
                className={styles["loading-gif"]}
                src={loadingGif}
                alt="Loading..."
            />
        </div>
        <h2 className={styles.message}>Loading...</h2>
        </div>
    );
};

export default LoadingPage;
