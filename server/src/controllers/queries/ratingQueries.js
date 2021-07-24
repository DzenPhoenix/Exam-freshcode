const db = require('../../models');
const errors = require('../../errors/Errors.js');

const updateRating = async function(data, predicate, transaction){
  const [updatedCount, [updatedRating]] = await db.Ratings.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update mark on this offer');
  }
  return updatedRating.dataValues;
};

const createRating = async function(data, transaction){
  const result = await db.Ratings.create(data, { transaction });
  if (!result) {
    const ServerError=errors.ServerError;
    throw new ServerError('cannot mark offer');
  } else {
    return result.get({ plain: true });
  }
};

module.exports={
  updateRating,
  createRating,
};


