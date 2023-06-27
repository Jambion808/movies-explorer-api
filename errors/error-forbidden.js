const { FORBIDDEN_CODE_ERROR } = require('./error-const');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_CODE_ERROR;
  }
}

module.exports = ForbiddenError;
