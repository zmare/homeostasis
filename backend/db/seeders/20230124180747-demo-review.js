'use strict';
const { Review } = require('../models')
const { seedReviews } = require('../../utils/fakerSeed.js')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';

    let reviews = seedReviews(30);

    return queryInterface.bulkInsert(options, reviews, {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';

    return queryInterface.bulkDelete(options, null, {})
  }
};
