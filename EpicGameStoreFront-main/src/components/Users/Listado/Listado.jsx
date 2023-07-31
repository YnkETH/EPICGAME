import style from "./Listado.module.css";
import { Link } from "react-router-dom";

function Listado({ datos, lista }) {
  let url = "";
  let newDatos = [];
  let contador = 0;
  if (lista === "Carrito") {
    url = "/cart";
  } else {
    url = "/favorites";
  }
  if (datos.length > 3) {
    newDatos = datos.slice(0, 10);
  } else {
    newDatos = datos;
  }
  console.log(datos);
  return newDatos.length > 0 ? (
    <div className={style.container}>
      <Link to={url} className={style.url}>
        <p className={style.boton}>{lista}</p>
      </Link>
      <div className={style.body}>
        {datos.length &&
          newDatos.map((juego) => {
            return (
              <div className={style.item}>
                <h4>{juego.title || juego.name}</h4>
                <img
                  src={juego.image}
                  alt={juego.title}
                  key={juego.title}
                  className={style.image}
                />
                <h4>{juego.price || juego.unit_price}</h4>
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Listado;
