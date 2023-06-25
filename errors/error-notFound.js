const { NOTFOUND_CODE_ERROR } = require('./error-const');

class NotfoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOTFOUND_CODE_ERROR;
  }
}

module.exports = NotfoundError;