const CONSTANTS = require('../constants');
const errors = require('../errors/Errors.js');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  try {
    req.hashPass = await bcrypt.hash(req.body.password, CONSTANTS.SALT_ROUNDS);
    next();
  } catch (err) {
    const ServerError = errors.ServerError;
    next(new ServerError('Server Error on hash password'));
  }
};
