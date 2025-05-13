"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Banners extends Model {
    static associate(models) {}
  }
  Banners.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(1024),
      },

      slug: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Banners",
    }
  );
  return Banners;
};
