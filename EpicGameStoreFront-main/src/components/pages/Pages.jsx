import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../actions";
import styles from "./pages.module.css"

export default function Pages({ videogamesPerPage, allVideogames }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage)

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={styles.pages}>
        {pageNumbers.map((number) => (
          <li className={styles.number} key={number} >
            <a onClick={() => dispatch(setCurrentPage(number))} className={number === currentPage ? styles. currentPage : styles.pageLink}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};




