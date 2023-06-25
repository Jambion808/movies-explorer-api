const { VALIDATION_CODE_ERROR } = require('./error-const');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_CODE_ERROR;
  }
}

module.exports = new ValidationError('Некорректные данные');