const db = require('../db/postgres/models/index.js');
const errors = require('../errors/Errors.js');
const CONSTANTS = require('../constants');

module.exports.parseBody = (req, res, next) => {
  req.body.contests = JSON.parse(req.body.contests);
  for (let i = 0; i < req.body.contests.length; i++) {
    if (req.body.contests[ i ].haveFile) {
      const file = req.files.splice(0, 1);
      req.body.contests[ i ].fileName = file[ 0 ].filename;
      req.body.contests[ i ].originalFileName = file[ 0 ].originalname;
    }
  }
  next();
};

module.exports.canGetContest = async (req, res, next) => {
  let result = null;
  try {
    if (req.tokenData.role === CONSTANTS.CUSTOMER) {
      result = await db.Contests.findOne({
        where: { id: req.headers.contestid, userId: req.tokenData.userId },
      });
    } else if (req.tokenData.role === CONSTANTS.CREATOR) {
      result = await db.Contests.findOne({
        where: {
          id: req.headers.contestid,
          status: {
            [ db.Sequelize.Op.or ]: [
              CONSTANTS.CONTEST_STATUS_ACTIVE,
              CONSTANTS.CONTEST_STATUS_FINISHED,
            ],
          },
        },
      });
    }
    const RightsError = errors.RightsError;
    result ? next() : next(new RightsError());
  } catch (e) {
    const ServerError = errors.ServerError;
    next(new ServerError(e));
  }
};

module.exports.onlyForCreative = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CUSTOMER) {
    const RightsError = errors.RightsError;
    next(new RightsError());
  } else {
    next();
  }

};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CREATOR) {
    const RightsError = errors.RightsError;
    return next(new RightsError('this page only for customers'));
  } else {
    next();
  }
};

module.exports.canSendOffer = async (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CUSTOMER) {
    const RightsError = errors.RightsError;
    return next(new RightsError());
  }
  try {
    const result = await db.Contests.findOne({
      where: {
        id: req.body.contestId,
      },
      attributes: ['status'],
    });
    if (result.get({ plain: true }).status ===
      CONSTANTS.CONTEST_STATUS_ACTIVE) {
      next();
    } else {
      const RightsError = errors.RightsError;
      return next(new RightsError());
    }
  } catch (e) {
    const ServerError = errors.ServerError;
    next(new ServerError());
  }

};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
    const result = await db.Contests.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: CONSTANTS.CONTEST_STATUS_ACTIVE,
      },
    });
    if (!result) {
      const RightsError = errors.RightsError;
      return next(new RightsError());
    }
    next();
  } catch (e) {
    const ServerError = errors.ServerError;
    next(new ServerError());
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const result = db.Contests.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: { [ db.Sequelize.Op.not ]: CONSTANTS.CONTEST_STATUS_FINISHED },
      },
    });
    if (!result) {
      const RightsError = errors.RightsError;
      return next(new RightsError());
    }
    next();
  } catch (e) {
    const ServerError = errors.ServerError;
    next(new ServerError());
  }
};

