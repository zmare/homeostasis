'use strict';
const { ReviewImage } = require('../models')
const { seedReviewImages } = require('../../utils/fakerSeed.js')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';

    let reviewImages = seedReviewImages(40);

    return queryInterface.bulkInsert(options, reviewImages, {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';

    return queryInterface.bulkDelete(options, null, {})
  }
};
