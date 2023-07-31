import React, { useEffect, useState } from "react";
import styles from "./searchBar.module.css";

export default function SearchBar({ handleSearch }) {
  const [name, setName] = useState("");

  useEffect(() => {
    handleSearch(name);
  }, [name, handleSearch]);

  const handleInputChange = (e) => {
    const string = e.target.value;
    setName(string);
  };

  return (
    <div className={`${styles.searchBarContainer} searchBarContainer`}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={`${styles.input} input`}
          placeholder="Search..."
          value={name}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
