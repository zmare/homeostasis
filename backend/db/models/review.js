'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // define association here
      Review.hasMany(
        models.ReviewImage, { foreignKey: 'reviewId', onDelete: 'cascade', hooks: true }
      )

      Review.belongsTo(
        models.User, { foreignKey: 'userId' }
      )

      Review.belongsTo(
        models.Spot, { foreignKey: 'spotId' }
      )

    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
