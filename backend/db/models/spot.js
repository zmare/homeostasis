'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {

    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User, { foreignKey: 'ownerId' }
      )

      Spot.hasMany(
        models.SpotImage, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true }
      )

      Spot.hasMany(
        models.Review, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true }
      )

      Spot.hasMany(
        models.Booking, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true }
      )
    }
  }

  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      isAlpha: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      isAlpha: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      isAlpha: true
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      isNumeric: true,
      min: -90,
      max: 90
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      isNumeric: true,
      min: -180,
      max: 180
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      isNumeric: true
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
