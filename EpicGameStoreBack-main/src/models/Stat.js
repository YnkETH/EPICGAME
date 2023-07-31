const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Stat', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      click: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      favorites: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      unfavorites: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      revenue: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      },
      totalReviews: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      copiesSold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }   
  },
  {timestamps: false,
    associate: (models) => {
        models.Stat.belongsTo(models.Videogame, {
          foreignKey: {
            name: 'videogameId',
            allowNull: true,
            unique: true
          },
          onDelete: 'CASCADE'
        });
      }
    }
  );
};
