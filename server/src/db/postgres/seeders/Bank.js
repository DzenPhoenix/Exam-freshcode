module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Banks', [
      {
        cardNumber: '4564654564564564',
        name: 'SquadHelp',
        expiry: '11/22',
        cvc: '453',
        balance: 0,
      },
      {
        cardNumber: '4111111111111111',
        name: 'yriy',
        expiry: '09/23',
        cvc: '505',
        balance: 5000,
      },
      {
        cardNumber: '4298785219727079',
        name: 'creator',
        expiry: '09/23',
        cvc: '505',
        balance: 0,
      },
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Banks', null, {});
  },

};
