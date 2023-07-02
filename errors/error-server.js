const { SERVER_CODE_ERROR } = require('./error-const');
const ValidationError = require('./error-validation');
const ConflictError = require('./error-conflict');

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res
      .status(ValidationError.statusCode)
      .send({ message: ValidationError.message });
    return;
  }

  if (err.code === 11000) {
    res
      .status(ConflictError.statusCode)
      .send({ message: ConflictError.message });
    return;
  }

  const { statusCode = SERVER_CODE_ERROR, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === SERVER_CODE_ERROR ? 'На сервере произошла ошибка' : message });

  next();
};
