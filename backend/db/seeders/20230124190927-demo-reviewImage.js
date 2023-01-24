'use strict';
const { ReviewImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviewImages = [
  {
    reviewId: 1,
    url: 'https://testURL.review1Image1.com'
  }
  // {
  //   reviewId: 1,
  //   url: 'https://testURL.review1Image2.com'
  // },
  // {
  //   reviewId: 1,
  //   url: 'https://testURL.review1Image3.com'
  // },
  // {
  //   reviewId: 2,
  //   url: 'https://testURL.review2Image1.com'
  // },
  // {
  //   reviewId: 2,
  //   url: 'https://testURL.review2Image2.com'
  // },
  // {
  //   reviewId: 3,
  //   url: 'https://testURL.review3Image1.com'
  // },
  // {
  //   reviewId: 4,
  //   url: 'https://testURL.review4Image1.com'
  // },
  // {
  //   reviewId: 4,
  //   url: 'https://testURL.review4Image2.com'
  // },
  // {
  //   reviewId: 4,
  //   url: 'https://testURL.review4Image3.com'
  // },
  // {
  //   reviewId: 5,
  //   url: 'https://testURL.review5Image1.com'
  // }
]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'ReviewImages';

    await queryInterface.bulkInsert(options, reviewImages, { validate: true })

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    });
  }
};
