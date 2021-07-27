const  { hashSync } = require('bcrypt');
const CONSTANTS = require('../../../constants.js');
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Denis',
          lastName: 'Maksimenko',
          displayName: 'Custom Den',
          password: hashSync('qwerty', CONSTANTS.SALT_ROUNDS),
          email: 'customden@gmail.com',
          role: 'customer',
          balance: 3000,
        },
        {
          firstName: 'Ivan',
          lastName: 'Ivanov',
          displayName: 'Creator Vanya',
          password: hashSync('qwerty', CONSTANTS.SALT_ROUNDS),
          email: 'creatorvanya@gmail.com',
          role: 'creator',
          balance: 0,
        },
      ],
      {},
    );
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
