'use strict'

const { TYPE } = require('../../app/enums/user')
const { User } = require('../../app/models')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await User.findOrCreate({
      where: { type: TYPE.ADMIN },
      defaults: {
        login: 'admin',
        password:
          '$2b$10$SMZF0Lscq0Y.MPesSHeFQuzpFlkbokHDj01IOWUsBmccwwGhPWi4m',
        type: TYPE.ADMIN,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
