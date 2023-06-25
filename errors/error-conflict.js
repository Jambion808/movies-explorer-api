const { CONFLICT_CODE_ERROR } = require('./error-const');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_CODE_ERROR;
  }
}

module.exports = new ConflictError(
  'Такой пользователь уже существует',
);