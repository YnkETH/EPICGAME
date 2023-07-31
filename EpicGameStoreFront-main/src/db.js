require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_URL
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions: {
    connectTimeout: 30000, // 30 seconds (adjust the value as needed)
  },
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre, Platform, Developers, Users, Carrito, Review, Stat } = sequelize.models;

// Aca vendrian las relaciones

Videogame.belongsToMany(Genre, { through: "VideogameGenre" });
Genre.belongsToMany(Videogame, { through: "VideogameGenre" });

Videogame.belongsToMany(Platform, {through: "VideogamePlatform"});
Platform.belongsToMany(Videogame, {through: "VideogamePlatform"});

Users.belongsToMany(Videogame, {through: "Favoritos"});
Videogame.belongsToMany(Users, {through: "Favoritos"});

// Users.belongsToMany(Videogame, {through: "UserShop"});
// Videogame.belongsToMany(Users, {through: "UserShop"});

Developers.hasMany(Videogame);
Videogame.belongsTo(Developers);

Users.hasOne(Carrito);
Carrito.belongsTo(Users);

Videogame.belongsToMany(Carrito, {through: "VideogameCarrito"});
Carrito.belongsToMany(Videogame, {through: "VideogameCarrito"});

Users.hasMany(Videogame, { foreignKey: 'userId', as: 'videogames' });
Videogame.belongsTo(Users, { foreignKey: 'userId', as: 'seller' });

Review.belongsToMany(Users, { through: "ReviewUsers" });
Users.belongsToMany(Review, { through: "ReviewUsers" });

Review.belongsToMany(Videogame, { through: "ReviewVideogame" });
Videogame.belongsToMany(Review, { through: "ReviewVideogame" });

Videogame.hasOne(Stat, { foreignKey: 'videogameId' });
Stat.belongsTo(Videogame, { foreignKey: 'videogameId' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
