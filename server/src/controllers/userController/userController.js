
const login = require('./login.js');
const registration = require('./registration.js');
const changeMark = require('./changeMark.js');
const payment = require('./payment.js');
const updateUser = require('./updateUser.js');
const cashout = require('./cashOut.js');
const recoverPassword = require('./recoverPassword.js');

module.exports = {
  recoverPassword,
  login,
  registration,
  changeMark,
  payment,
  updateUser,
  cashout,
};
