const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    apiId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    launchDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    screenshots: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 9.9
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5
    },
    status: {
      type: DataTypes.ENUM('pendingApproval', 'active', 'inactive', 'banned'),
      defaultValue: 'pendingApproval'
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }      
  },
  {timestamps: false}
  );
};
