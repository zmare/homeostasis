'use strict';
const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviews = [
  {
    spotId: 1,
    userId: 1,
    review: "Wonderful stay! Would stay again",
    stars: 5
  },
  {
    spotId: 1,
    userId: 3,
    review: "Hot water ran out. Not fun :/",
    stars: 1
  },
  {
    spotId: 4,
    userId: 2,
    review: "Beautiful views of the mountain. Amazing amenties. Would recommend!",
    stars: 5
  },
  {
    spotId: 2,
    userId: 3,
    review: "Not enough blankets but otherwise a good stay.",
    stars: 3
  },
  {
    spotId: 3,
    userId: 1,
    review: "Loved this home! The kitchen had everything we needed and more!!!",
    stars: 5
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';

    await queryInterface.bulkInsert(options, reviews, { validate: true })

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    });
  }
};
