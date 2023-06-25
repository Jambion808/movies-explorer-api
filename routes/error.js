const NotFoundError = require('../errors/error-notFound');

const errorRouter = (req, res, next) => {
  next(new NotFoundError('Данные не найдены'));
};

module.exports = errorRouter;