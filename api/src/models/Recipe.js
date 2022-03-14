const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type:DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumen:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    puntuacion:{
      type: DataTypes.STRING,
    },
    saludable:{
      type: DataTypes.INTEGER,
    },
    pasos:{
      type: DataTypes.TEXT,
    }
  });
};
