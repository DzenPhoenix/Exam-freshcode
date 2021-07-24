const bd = require('../../models');
const errors = require('../../errors/Errors.js');

module.exports.updateBankBalance = async function(data, predicate, transaction){
  const [updatedCount] = await bd.Banks.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount < 2) {
    const BankDeclineError=errors.BankDeclineError;
    throw new BankDeclineError('Bank decline transaction');
  }
};
