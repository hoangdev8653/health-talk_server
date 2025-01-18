'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Postcards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Postcards.init({
    title: DataTypes.STRING,
    decription: DataTypes.STRING,
    video_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Postcards',
  });
  return Postcards;
};