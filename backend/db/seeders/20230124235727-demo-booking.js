'use strict';
const { Booking } = require('../models')
const { seedBookings } = require('../../utils/fakerSeed.js')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// const bookings = [
//   {
//     spotId: 1,
//     userId: 1,
//     startDate: "2021-11-19",
//     endDate: "2021-11-20"
//   }

// ]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';

    let bookings = seedBookings(40);

    return queryInterface.bulkInsert(options, bookings, {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';

    return queryInterface.bulkDelete(options, null, {})
  }
};
