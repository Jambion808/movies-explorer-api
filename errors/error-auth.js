const { UNAUTH_CODE_ERROR } = require('./error-const');

class UnauthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTH_CODE_ERROR;
  }
}

module.exports = UnauthError;