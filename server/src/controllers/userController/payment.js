const CONSTANTS = require('../../constants.js');
const db = require('../../models/index.js');
const moment = require('moment');
const { v4: uuid } = require('uuid');
const bankQueries = require('../queries/bankQueries.js');

const payment = async function (req, res, next){
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    await bankQueries.updateBankBalance({
      balance: db.sequelize.literal(`
                CASE
            WHEN "cardNumber"='${ req.body.number.replace(/ /g,
    '') }' AND "cvc"='${ req.body.cvc }' AND "expiry"='${ req.body.expiry }'
                THEN "balance"-${ req.body.price }
            WHEN "cardNumber"='${ CONSTANTS.SQUADHELP_BANK_NUMBER }' AND "cvc"='${ CONSTANTS.SQUADHELP_BANK_CVC }' AND "expiry"='${ CONSTANTS.SQUADHELP_BANK_EXPIRY }'
                THEN "balance"+${ req.body.price } END
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
    const orderId = uuid();
    req.body.contests.forEach((contest, index) => {
      const prize = index === req.body.contests.length - 1 ? Math.ceil(
        req.body.price / req.body.contests.length)
        : Math.floor(req.body.price / req.body.contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId: req.tokenData.userId,
        priority: index + 1,
        orderId,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        prize,
      });
    });
    await db.Contests.bulkCreate(req.body.contests, transaction);
    transaction.commit();
    res.send();
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports=payment;
