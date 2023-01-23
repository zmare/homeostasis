'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'firstName',
      {
        type: Sequelize.STRING(50)
      }, options)

    await queryInterface.addColumn('Users', 'lastName',
      {
        type: Sequelize.STRING(50)
      }, options)


  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    await queryInterface.removeColumn(options, 'firstName');
    await queryInterface.removeColumn(options, 'lastName');
  }
};
