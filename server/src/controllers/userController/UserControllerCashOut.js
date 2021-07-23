const CONSTANTS = require('../../constants.js');
const db = require('../../models/index.js');
const userQueries = require('../queries/userQueries');
const bankQueries = require('../queries/bankQueries');

const cashout = async function (req, res, next){
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const updatedUser = await userQueries.updateUser(
      { balance: db.sequelize.literal('balance - ' + req.body.sum) },
      req.tokenData.userId, transaction);
    await bankQueries.updateBankBalance({
      balance: db.sequelize.literal(`CASE 
                WHEN "cardNumber"='${ req.body.number.replace(/ /g,
    '') }' AND "expiry"='${ req.body.expiry }' AND "cvc"='${ req.body.cvc }'
                    THEN "balance"+${ req.body.sum }
                WHEN "cardNumber"='${ CONSTANTS.SQUADHELP_BANK_NUMBER }' AND "expiry"='${ CONSTANTS.SQUADHELP_BANK_EXPIRY }' AND "cvc"='${ CONSTANTS.SQUADHELP_BANK_CVC }'
                    THEN "balance"-${ req.body.sum }
                 END
                `),
    },
    {
      cardNumber: {
        [ db.Sequelize.Op.in ]: [
          CONSTANTS.SQUADHELP_BANK_NUMBER,
          req.body.number.replace(/ /g, ''),
        ],
      },
    },
    transaction);
    transaction.commit();
    res.send({ balance: updatedUser.balance });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports=cashout;
