'use strict';
const { SpotImage } = require('../models')
const { seedSpotImages } = require('../../utils/fakerSeed.js')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
