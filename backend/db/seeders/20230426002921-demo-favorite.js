'use strict';
const { seedFavorites } = require('../../utils/fakerSeed.js')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Favorites';

    let favorites = seedFavorites(8);

    return queryInterface.bulkInsert(options, favorites, {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Favorites';

    return queryInterface.bulkDelete(options, null, {})
  }
};
