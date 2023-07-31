import React from 'react';
import styles from './NavbarSec.module.css';
import SearchBar from '../searchBar/SearchBar';
import Selector from './Selecto';
import { useSelector } from "react-redux";

export default function NavbarSec({ handleSort, handleReset, handleSearch, handleGenres }) {
  const genres = useSelector(state => state.genres)
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarNav}>
        <li className={styles.navItem}> 
          <span className={styles.spans}>A-Z</span>
          <button onClick={() => handleSort("AtoZ")} className={styles.navLink}>
          {'\u2191'}
          </button>
          <button onClick={() => handleSort("ZtoA")} className={styles.navLink}>
          {'\u2193'}
          </button>
        </li>        
       
        <li className={styles.navItem}>
        <span className={styles.spans}>Price</span>
          <button onClick={() => handleSort("PriceAsc")} className={styles.navLink}>
          {'\u2191'}
          </button>
          <button onClick={() => handleSort("PriceDesc")} className={styles.navLink}>
          {'\u2193'}
          </button>    
        </li>        
            
        <li className={styles.navItem}>
        <span className={styles.spans}>Rating</span>
          <button onClick={() => handleSort("RatingAsc")} className={styles.navLink}>
          {'\u2191'}
          </button>
          <button onClick={() => handleSort("RatingDesc")} className={styles.navLink}>
          {'\u2193'}
          </button>
        </li>
        <li className={styles.navItem}>
          <Selector options={genres} handleGenres={handleGenres} placeholder={"Genre"}/>
        </li>
        <li className={styles.navItem}>
          <button onClick={() => handleReset()} className={styles.navLink}>
            All
          </button>
        </li>
        <li className={styles.navItem}>
        <SearchBar handleSearch={handleSearch}/>
        </li>
      </ul>
    </nav>
  );
}


