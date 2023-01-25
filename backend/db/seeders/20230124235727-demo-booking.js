'use strict';
const { Booking } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bookings = [
  {
    spotId: 1,
    userId: 1,
    startDate: "2021-11-19",
    endDate: "2021-11-20"
  }

]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';

    await queryInterface.bulkInsert(options, bookings, { validate: true })

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    });
  }
};
