const jwt = require('jsonwebtoken');
const UnauthError = require('../errors/error-auth');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'f8308e4d93f6afd42c122bebbf1fc418e0fe73aa2c3ebf172c3d129dc629d9ef');
  } catch (err) {
    throw new UnauthError('Необходима авторизация');
  }
  req.user = payload;
  return next();
};