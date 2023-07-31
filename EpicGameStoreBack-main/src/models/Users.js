const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userEmail:{
      type: DataTypes.STRING,
      allowNull: true
    },
    userBirth: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    userImage:{
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    },
    role: {
      type: DataTypes.ENUM('cliente', 'vendedor', 'admin'),
      defaultValue: `cliente`,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }    
  }, {
    timestamps: false
  });
};