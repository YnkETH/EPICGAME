import React from 'react';
import styles from './NavbarSec.module.css';

export default function Selector({ options, handleGenres, placeholder }) {
  return (
    <select className={styles.selector} onChange={handleGenres}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.genreName} value={option.genreName}>
          {option.genreName}
        </option>
      ))}
    </select>
  );
}
