const db = require('../../models/index.js');
const controller = require('../../socketInit.js');
const userQueries = require('../queries/userQueries.js');
const ratingQueries = require('../queries/ratingQueries.js');

const getQuery = (offerId, userId, mark, isFirst, transaction)=> {
  const getCreateQuery = ratingQueries.createRating({
    offerId,
    mark,
    userId }
  , transaction);
  const getUpdateQuery = ratingQueries.updateRating({ mark },
    { offerId, userId }, transaction);
  return isFirst ? getCreateQuery : getUpdateQuery;
};

const changeMark = async function (req, res, next) {
  let sum = 0;
  let avg = 0;
  let transaction;
  const { isFirst, offerId, mark, creatorId } = req.body;
  const userId = req.tokenData.userId;
  try {
    transaction = await db.sequelize.transaction(
      { isolationLevel: db.Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED });
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();
    const offersArray = await db.Ratings.findAll({
      include: [
        {
          model: db.Offers,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });
    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[ i ].dataValues.mark;
    }
    avg = sum / offersArray.length;

    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    transaction.commit();
    controller.getNotificationController().emitChangeMark(creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports=changeMark;
