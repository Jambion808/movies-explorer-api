const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotfoundError = require('../errors/error-notFound');
const UnAuthError = require('../errors/error-auth');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })
        .then((user) => res.status(201)
          .send({
            name: user.name,
            email: user.email,
          }))
        .catch((err) => (next(err)));
    });
};

module.exports.getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotfoundError('Пользователь не найден');
    })
    .then((user) => {
      res
        .status(200)
        .send({
          email: user.email,
          name: user.name,
        });
    })
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnAuthError('Неверный логин или пароль');
      }
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnAuthError('Неверный логин или пароль');
          }
          const token = jwt.sign({ _id: user._id }, 'f8308e4d93f6afd42c122bebbf1fc418e0fe73aa2c3ebf172c3d129dc629d9ef', {
            expiresIn: '7d',
          });
          res.status(200).send({ token });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports.updateUserData = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotfoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(201)
        .send({
          email: user.email,
          name: user.name,
        });
    })
    .catch((err) => next(err));
};