
const login = require('./userControllerLogin.js');
const registration = require('./userControllerRegistration.js');
const changeMark = require('./userControllerChangeMark.js');
const payment = require('./userControllerPayment.js');
const updateUser = require('./userControllerUpdateUser.js');
const cashout = require('./UserControllerCashOut.js');

module.exports = {
  login,
  registration,
  changeMark,
  payment,
  updateUser,
  cashout,
};
