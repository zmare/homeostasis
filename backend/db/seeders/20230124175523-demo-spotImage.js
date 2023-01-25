'use strict';
const { SpotImage } = require('../models')
const { seedSpotImages } = require('../../utils/fakerSeed.js')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// const spotImages = [
//   {
//     spotId: 1,
//     url: 'https://testURL_spot1Image1.com',
//     preview: true
//   }
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
//]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';

    let spotImages = seedSpotImages(40);

    return queryInterface.bulkInsert(options, spotImages, {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';

    return queryInterface.bulkDelete(options, null, {})
  }
};
