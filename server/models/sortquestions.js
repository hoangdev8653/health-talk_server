'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sortQuestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sortQuestions.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    tagId: DataTypes.STRING,
    views: DataTypes.STRING,
    answers: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sortQuestions',
  });
  return sortQuestions;
};