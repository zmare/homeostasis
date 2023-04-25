'use strict';
const { Spot } = require('../models')
const { seedSpots } = require('../../utils/fakerSeed.js')
const { spots } = require('../../utils/spot_data')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';

    //let spots = seedSpots(10);

    return queryInterface.bulkInsert(options, spots, {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';

    return queryInterface.bulkDelete(options, null, {})
  }
};
