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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    spoonacularScore:{
      type: DataTypes.STRING,
      validate: {
        min: 0,
        max: 100
      },
      defaultValue: 0
    },
    healthScore:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      }
    },
    steps:{
      type: DataTypes.TEXT,
    },
    image:{
      type: DataTypes.STRING,
      defaultValue: "https://cdn-icons-png.flaticon.com/512/3570/3570168.png"
    },
  });
};
