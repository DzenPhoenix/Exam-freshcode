const bd = require('../../models');
const errors = require('../../errors/Errors.js');

const updateContest = async function(data, predicate, transaction){
  const [updatedCount, [updatedContest]] = await bd.Contests.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    const ServerError = errors.ServerError;
    throw new ServerError('cannot update Contest');
  } else {
    return updatedContest.dataValues;
  }
};

const updateContestStatus = async function(data, predicate, transaction){
  const updateResult = await bd.Contests.update(data,
    { where: predicate, returning: true, transaction });
  if (updateResult[ 0 ] < 1) {
    const ServerError = errors.ServerError;
    throw new ServerError('cannot update Contest');
  } else {
    return updateResult[ 1 ][ 0 ].dataValues;
  }
};

const updateOffer = async function(data, predicate, transaction){
  const [updatedCount, [updatedOffer]] = await bd.Offers.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    const ServerError = errors.ServerError;
    throw new ServerError('cannot update offer!');
  } else {
    return updatedOffer.dataValues;
  }
};

const updateOfferStatus = async function(data, predicate, transaction){
  const result = await bd.Offers.update(data,
    { where: predicate, returning: true, transaction });
  if (result[ 0 ] < 1) {
    const ServerError = errors.ServerError;
    throw new ServerError('cannot update offer!');
  } else {
    return result[ 1 ];
  }
};

const createOffer = async function(data){
  const result = await bd.Offers.create(data);
  if (!result) {
    const ServerError = errors.ServerError;
    throw new ServerError('cannot create new Offer');
  } else {
    return result.get({ plain: true });
  }
};

module.exports={
  updateContest,
  updateContestStatus,
  updateOffer,
  updateOfferStatus,
  createOffer,
};
