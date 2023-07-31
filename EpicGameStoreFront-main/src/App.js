import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import CreateVideogame from "./components/createVideogame/CreateVideogame.jsx";
import Detail from "./components/detail/Detail.jsx";
import About from "./components/about/About.jsx"
import Favorites from "./components/Favorites/Favorites.jsx";
import "./App.css";
import Cart from "./components/Cart/Cart.jsx";
import User from "./components/Users/Users.jsx";
import Admin from "./components/Users/Admin/Admin.jsx";
import { Pay } from "./components/Pay/Pay.jsx";
import Vendor from "./components/Users/Vendor.jsx";
axios.defaults.baseURL = `https://epicgamestore-b96dc1080e77.herokuapp.com`;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home/:id" component={Detail} />
          <Route path="/home" component={Home} />
          <Route path="/videogame" component={CreateVideogame} />
          <Route path="/about" component={About} />
          <Route path="/cart" component={Cart} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/miPerfil" component={User} />
          <Route path="/admin" component={Admin} />
          <Route path="/pay" component={Pay} />
          <Route path="/vendor" component={Vendor}  />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
