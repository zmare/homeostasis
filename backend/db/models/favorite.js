'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {

    static associate(models) {
      // define association here

      Favorite.belongsTo(
        models.User, { foreignKey: 'userId' }
      )

      Favorite.belongsTo(
        models.Spot, { foreignKey: 'spotId' }
      )
    }
  }
  Favorite.init({
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};
