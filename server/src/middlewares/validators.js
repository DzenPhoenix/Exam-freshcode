const schems = require('../validationSchemes/schems');
const errors = require('../errors/Errors.js');

module.exports.validateRegistrationData = async (req, res, next) => {
  const validationResult = await schems.registrationSchem.isValid(req.body);
  if (!validationResult) {
    const BadRequestError = errors.BadRequestError;
    return next(new BadRequestError('Invalid data for registration'));
  } else {
    next();
  }
};

module.exports.validateLogin = async (req, res, next) => {
  const validationResult = await schems.loginSchem.isValid(req.body);
  if (validationResult) {
    next();
  } else {
    const BadRequestError = errors.BadRequestError;
    return next(new BadRequestError('Invalid data for login'));
  }
};

module.exports.validateRecover = async (req, res, next)=>{
  const token = req.body.token;
  const validationResult = await schems.loginSchem.isValid(req.body);

  if (validationResult || token) {
    next();
  } else {
    const BadRequestError = errors.BadRequestError;
    return next(new BadRequestError('Invalid data for login'));
  }
};

module.exports.validateContestCreation = (req, res, next) => {
  const promiseArray = [];
  req.body.contests.forEach(el => {
    promiseArray.push(schems.contestSchem.isValid(el));
  });
  return Promise.all(promiseArray)
    .then(results => {
      results.forEach(result => {
        if (!result) {
          const BadRequestError = errors.BadRequestError;
          return next(new BadRequestError());
        }
      });
      next();
    })
    .catch(err => {
      next(err);
    });
};
