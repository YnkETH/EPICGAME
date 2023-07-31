import React, { useEffect, useState } from "react";
import style from "./about.module.css";
import express from "./express.png";
import node from "./node.png";
import postgres from "./postgresql.png";
import react from "./react.jpg";
import redux from "./redux.png";
import sequelize from "./sequalize.png";
import github from "./gitHub.png";
import linkedIn from "./linkedIn.png";
import { Link, useHistory } from "react-router-dom";
import fotoAle from "./fotoAle.jpeg";
import fotoAlex from "./fotoAlex.jpeg";
import fotoRafa from "./fotoRafa.jpeg";
import fotoEric from "./fotoEric.jpeg";
import peru from "./peru.jpg";
import fotoGilbert from "./fotoGilbert.jpeg";
import colombia from "./colombia.png";
import fotoJeffrey from "./fotoJeffrey.jpeg";
import fotoSeba from "./fotoSeba.jpeg";
import NavBar from "../NavBar/NavBar";
import axios from "axios";


function About() {
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [size, setSize] = useState([]);
  const dataUser = JSON.parse(localStorage.getItem("userData"));

  useEffect(async () => {
    if (cart?.length === 0) {
      try {
        const cartID = dataUser.cartID;
        const response = await axios.get(
          `/cart/${cartID}`
        );
        setCart(response.data[0]?.Videogames);
        setSize(response.data[0]?.Videogames.length);
      } catch (error) {}
    }
  }, []);

  return (
    <div className={style.container}>
      <NavBar size={size} />
      <div className={style.info}>
        <div className={style.upInfo}>
          <h1>
            Hello, we are the developers of the EpicGamesStore. It is a pleasure
            that you visit our page.
          </h1>
          <h2>These are the technologies implemented in this application...</h2>
        </div>
      </div>

      <div className={style.iconTech}>
        <img src={express} alt="Express" />
        <img src={node} alt="Node" />
        <img src={postgres} alt="Postgres" />
        <img src={react} alt="React" />
        <img src={redux} alt="Redux" />
        <img src={sequelize} alt="Sequelize" />
      </div>

      <div clasName={style.cardContainer}>
        <div className={style.card}>
          <div className={style.cardImg}>
            <img src={fotoAle} alt="Ale" />
          </div>
          <div className={style.cardText}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/800px-Flag_of_Argentina.svg.png"
              alt="Argentina"
            ></img>
            <h2>Alejandro Romero</h2>
            <h3>Age:40</h3>
            <h3>
              Profession: Mathematics teacher. Senior Librarian. Full Stack web
              Developer.
            </h3>
          </div>
          <div className={style.links}>
            <Link to={"https://github.com/alejandrodavidromero"}>
              <img src={github} alt="github"></img>
            </Link>
            <Link
              to={
                "https://www.linkedin.com/in/alejandro-david-romero-190128240/"
              }
            >
              <img src={linkedIn} alt="linkedIn"></img>
            </Link>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cardImg}>
            <img src={fotoAlex} alt="Alex" />
          </div>
          <div className={style.cardText}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/800px-Flag_of_Argentina.svg.png"
              alt="Argentina"
            ></img>
            <h2>Alex Ruiz</h2>
            <h3>Age:23</h3>
            <h3>Profession: Usher, Full Stack Developer</h3>
          </div>
          <div className={style.links}>
            <Link to={"https://github.com/alexwrz"}>
              <img src={github} alt="github"></img>
            </Link>
            <Link to={"https://www.linkedin.com/in/alex-ruiz-339b35236"}>
              <img src={linkedIn} alt="linkedIn"></img>
            </Link>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cardImg}>
            <img src={fotoEric} alt="Eric" />
          </div>
          <div className={style.cardText}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mexico.jpg"
              alt="México"
            ></img>
            <h2>Eric Ramirez</h2>
            <h3>Age:30</h3>
            <h3>
              Profession: Business Develop Support, Full Stack web Developer
            </h3>
          </div>
          <div className={style.links}>
            <Link to={"https://github.com/sckarlet015"}>
              <img src={github} alt="github"></img>
            </Link>
            <Link to={"https://www.linkedin.com/in/eric-ramirez-744b02124"}>
              <img src={linkedIn} alt="linkedIn"></img>
            </Link>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cardImg}>
            <img src={fotoJeffrey} alt="Giancarlo" />
          </div>
          <div className={style.cardText}>
            <img src={peru} alt="Perú"></img>
            <h2>Giancarlo Moreno</h2>
            <h3>Age:27</h3>
            <h3>
              Profession: Business manager. Photographer. Full Stack web
              Developer.
            </h3>
          </div>
          <div className={style.links}>
            <Link to={"https://github.com/YnkETH/"}>
              <img src={github} alt="github"></img>
            </Link>
            <Link
              to={
                "https://www.linkedin.com/in/alejandro-david-romero-190128240/"
              }
            >
              <img src={linkedIn} alt="linkedIn"></img>
            </Link>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cardImg}>
            <img src={fotoGilbert} alt="Gilberto" />
          </div>
          <div className={style.cardText}>
            <img src={colombia} alt="Colombia"></img>
            <h2>Gilberto Andrés Castaño Rivera</h2>
            <h3>Age:22</h3>
            <h3>
              Profession: Costumer service representative, Full Stack web
              Developer.
            </h3>
          </div>
          <div className={style.links}>
            <Link to={"https://github.com/GilCasR"}>
              <img src={github} alt="github"></img>
            </Link>
            <Link
              to={
                "https://www.linkedin.com/in/gilberto-andres-casta%C3%B1o-rivera-04bab6251/"
              }
            >
              <img src={linkedIn} alt="linkedIn"></img>
            </Link>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cardImg}>
            <img src={fotoSeba} alt="Sebastian" />
          </div>
          <div className={style.cardText}>
            <img src={colombia} alt="Colombia"></img>
            <h2>Juan Sebastian olarte Sánchez</h2>
            <h3>Age:21</h3>
            <h3>Profession: deliverer, Full Stack web Developer.</h3>
          </div>
          <div className={style.links}>
            <Link to={"https://github.com/Juanolarte11"}>
              <img src={github} alt="github"></img>
            </Link>
            <Link
              to={
                "https://www.linkedin.com/in/sebastian-olarte-sanchez-8a2b50205"
              }
            >
              <img src={linkedIn} alt="linkedIn"></img>
            </Link>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cardImg}>
            <img src={fotoRafa} alt="Rafael" />
          </div>
          <div className={style.cardText}>
            <img src={peru} alt="Perú"></img>
            <h2>Rafael Ibarra</h2>
            <h3>Age:58</h3>
            <h3>Profession: Industrial Engineer. Full Stack web Developer.</h3>
          </div>
          <div className={style.links}>
            <Link to={"https://github.com/rafbar2000rr"}>
              <img src={github} alt="github"></img>
            </Link>
            <Link to={"https://www.linkedin.com/in/rafael-ibarra-6193a857/"}>
              <img src={linkedIn} alt="linkedIn"></img>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
