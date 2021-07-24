const ApplicationError = require('./ApplicationError.js');
const BadRequestError = require('./BadRequestError.js');
const BankDeclineError = require('./BankDeclineError.js');
const DevAlreadyExistError = require('./DevAlreadyExistError.js');
const NotEnoughMoney = require('./NotEnoughMoney.js');
const NotUniqueEmailError = require('./NotUniqueEmailError.js');
const RightsError = require('./RightsError.js');
const ServerError = require('./ServerError.js');
const TokenError = require('./TokenError.js');
const UncorrectPassword = require('./UncorrectPassword.js');
const UserNotFoundError = require('./UserNotFoundError.js');

module.exports= {
  ApplicationError,
  BadRequestError,
  BankDeclineError,
  DevAlreadyExistError,
  NotEnoughMoney,
  NotUniqueEmailError,
  RightsError,
  ServerError,
  TokenError,
  UncorrectPassword,
  UserNotFoundError,
};
