'use strict';
const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spotImages = [
  {
    spotId: 1,
    url: 'https://testURL_spot1Image1.com',
    preview: true
  }
  // {
  //   spotId: 1,
  //   url: 'https://testURL_spot1Image2.com',
  //   preview: true
  // },
  // {
  //   spotId: 1,
  //   url: 'https://testURL_spot1Image3.com',
  //   preview: true
  // },
  // {
  //   spotId: 2,
  //   url: 'https://testURL_spot2Image1.com',
  //   preview: true
  // },
  // {
  //   spotId: 2,
  //   url: 'https://testURL_spot2Image2.com',
  //   preview: true
  // },
  // {
  //   spotId: 3,
  //   url: 'https://testURL_spot3Image1.com',
  //   preview: true
  // },
  // {
  //   spotId: 4,
  //   url: 'https://testURL_spot4Image1.com',
  //   preview: true
  // },
  // {
  //   spotId: 4,
  //   url: 'https://testURL_spot4Image2.com',
  //   preview: true
  // },
  // {
  //   spotId: 4,
  //   url: 'https://testURL_spot4Image3.com',
  //   preview: true
  // },
  // {
  //   spotId: 4,
  //   url: 'https://testURL_spot4Image4.com',
  //   preview: true
  // }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';

    await queryInterface.bulkInsert(options, spotImages, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    });
  }
};
