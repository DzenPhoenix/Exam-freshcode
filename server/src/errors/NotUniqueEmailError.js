const ApplicationError = require('./ApplicationError');

class NotUniqueEmailError extends ApplicationError{
  constructor (message) {
    super(message || 'this email were already exist', 409);
  }
}

module.exports = NotUniqueEmailError;
