'use strict';
const { Spot } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spots = [
  {
    ownerId: 1,
    address: '123 Disney Lane',
    city: 'San Francisco',
    state: 'California',
    country: 'United States of America',
    lat: 37.1234567,
    lng: -122.1234567,
    name: 'App Academy',
    description: 'Place where web developers are created',
    price: 123
  },
  {
    ownerId: 2,
    address: '456 Disney Lane',
    city: 'San Francisco',
    state: 'California',
    country: 'United States of America',
    lat: 37.1234567,
    lng: -122.1234567,
    name: 'App Academy',
    description: 'Place where web developers are created',
    price: 210
  },
  {
    ownerId: 3,
    address: '789 Disney Lane',
    city: 'San Francisco',
    state: 'California',
    country: 'United States of America',
    lat: 37.1234567,
    lng: -122.1234567,
    name: 'App Academy',
    description: 'Place where web developers are created',
    price: 218
  },
  {
    ownerId: 1,
    address: '123456 Disney Lane',
    city: 'San Francisco',
    state: 'California',
    country: 'United States of America',
    lat: 37.1234567,
    lng: -122.1234567,
    name: 'App Academy',
    description: 'Place where web developers are created',
    price: 302
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';

    await queryInterface.bulkInsert(options, spots, { validate: true })
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4] }
    });

  }
};
