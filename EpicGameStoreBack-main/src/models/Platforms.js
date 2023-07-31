const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Platform', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    platformName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    requirements: {
      type: DataTypes.TEXT,
      defaultValue: "Sin requisitos"
    }
  }, {
    timestamps: false
  });
};